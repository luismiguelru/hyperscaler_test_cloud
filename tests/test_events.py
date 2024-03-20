# -*- coding: utf-8 -*-
#
# Copyright (c) 2024, Ingram Micro
# All rights reserved.
#
from connect_ext.events import HyperscalerTestCloudEventsApplication


def test_handle_asset_cancel_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_asset_cancel_request_processing(request)
    assert result.status == 'success'


def test_handle_product_changed(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_product_changed(request)
    assert result.status == 'success'


def test_handle_asset_resume_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_asset_resume_request_processing(request)
    assert result.status == 'success'


def test_handle_contract_changed(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_contract_changed(request)
    assert result.status == 'success'


def test_handle_asset_adjustment_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_asset_adjustment_request_processing(request)
    assert result.status == 'success'


def test_handle_asset_purchase_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_asset_purchase_request_processing(request)
    assert result.status == 'success'


def test_handle_listing_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_listing_request_processing(request)
    assert result.status == 'success'


def test_handle_listing_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_listing_processing(request)
    assert result.status == 'success'


def test_handle_asset_change_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_asset_change_request_processing(request)
    assert result.status == 'success'


def test_handle_asset_suspend_request_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.handle_asset_suspend_request_processing(request)
    assert result.status == 'success'


def test_execute_scheduled_processing(
    connect_client,
    client_mocker_factory,
    logger,
):
    config = {}
    request = {'id': 1}
    ext = HyperscalerTestCloudEventsApplication(connect_client, logger, config)
    result = ext.execute_scheduled_processing(request)
    assert result.status == 'success'
