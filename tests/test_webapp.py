# -*- coding: utf-8 -*-
#
# Copyright (c) 2024, Ingram Micro
# All rights reserved.
#
from connect.client import R

from connect_ext.schemas import Marketplace, Settings
from connect_ext.webapp import HyperscalerTestCloudWebApplication


def test_list_marketplaces(test_client_factory, client_mocker_factory):
    marketplaces = [
        {
            'id': 'MP-000',
            'name': 'MP 000',
            'description': 'MP 000 description',
            'icon': 'mp_000.png',
        },
        {
            'id': 'MP-001',
            'name': 'MP 001',
            'description': 'MP 001 description',
            'icon': 'mp_001.png',
        },
    ]
    client_mocker = client_mocker_factory()

    client_mocker.marketplaces.all().mock(return_value=marketplaces)

    client = test_client_factory(HyperscalerTestCloudWebApplication)
    response = client.get('/api/marketplaces')

    assert response.status_code == 200

    data = response.json()

    assert data == marketplaces


def test_list_marketplaces_api_error(test_client_factory, client_mocker_factory):
    client_mocker = client_mocker_factory()

    error_data = {
        'error_code': 'AUTH_001',
        'errors': [
            'API request is unauthorized.',
        ],
    }

    client_mocker.marketplaces.all().mock(
        status_code=401,
        return_value=error_data,
    )

    client = test_client_factory(HyperscalerTestCloudWebApplication)
    response = client.get('/api/marketplaces')

    assert response.status_code == 401
    assert response.json() == error_data


def test_retrieve_settings_empty(test_client_factory):
    installation = {
        'id': 'EIN-000',
        'settings': {},
    }

    client = test_client_factory(HyperscalerTestCloudWebApplication)

    response = client.get('/api/settings', installation=installation)
    assert response.status_code == 200

    data = response.json()
    assert data['marketplaces'] == []


def test_retrieve_settings(test_client_factory):
    marketplaces = [
        {
            'id': 'MP-000',
            'name': 'MP 000',
            'description': 'MP 000 description',
            'icon': 'mp_000.png',
        },
    ]

    installation = {
        'id': 'EIN-000',
        'settings': {
            'marketplaces': marketplaces,
        },
    }

    client = test_client_factory(HyperscalerTestCloudWebApplication)

    response = client.get('/api/settings', installation=installation)
    assert response.status_code == 200

    data = response.json()
    assert data['marketplaces'] == marketplaces


def test_save_settings(test_client_factory, client_mocker_factory):
    settings = Settings(
        marketplaces=[
            Marketplace(id='MP-000', name='My MP', description='My MP description', icon='/mp.png'),
        ],
    )

    client_mocker = client_mocker_factory()

    client_mocker('devops').installations['EIN-000'].update(
        return_value={},
        match_body={
            'settings': settings.dict(),
        },
    )

    client = test_client_factory(HyperscalerTestCloudWebApplication)

    response = client.post(
        '/api/settings',
        json=settings.dict(),
        context={'installation_id': 'EIN-000'},
    )
    assert response.status_code == 200

    data = response.json()
    assert data == settings.dict()


def test_generate_chart_data(test_client_factory, client_mocker_factory):
    marketplaces = [
        {
            'id': 'MP-000',
            'name': 'MP 000',
            'description': 'MP 000 description',
            'icon': 'mp_000.png',
        },
        {
            'id': 'MP-001',
            'name': 'MP 001',
            'description': 'MP 001 description',
            'icon': 'mp_001.png',
        },
    ]

    installation = {
        'id': 'EIN-000',
        'settings': {
            'marketplaces': marketplaces,
        },
    }

    client_mocker = client_mocker_factory()
    for idx, mp in enumerate(marketplaces):
        client_mocker('subscriptions').assets.filter(
            R().marketplace.id.eq(mp['id']) & R().status.eq('active'),
        ).count(return_value=idx)

    client = test_client_factory(HyperscalerTestCloudWebApplication)
    response = client.get('/api/chart', installation=installation)

    assert response.status_code == 200

    assert response.json() == {
        'type': 'bar',
        'data': {
            'labels': ['MP-000', 'MP-001'],
            'datasets': [
                {
                    'label': 'Subscriptions',
                    'data': [0, 1],
                },
            ],
        },
    }
