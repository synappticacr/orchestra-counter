var queues = new function() {

    var myQueuesTable;
    var queuesTable;
    var ticketsTable;
    var SORTING = [[2, 'desc'], [3, 'desc'], [0, 'asc']];

    /*
     * keepCalling should be set to true to have this function call itself every 30 secs.
     * sessvars.queueTimer can be used to stop the call
     */
    this.updateQueues = function(keepCalling) {
        if(!servicePoint.getWorkstationOffline() && servicePoint.hasValidSettings()) {

            if(typeof queuesTable !== 'undefined' && typeof myQueuesTable !== 'undefined') {

                // All Queues
                queuesTable.fnClearTable();
                var queuesData = spService.get("branches/" + sessvars.branchId + "/queues");
                queuesTable.fnAddData(queuesData);
                queuesTable.fnSort(SORTING);
                queuesTable.fnAdjustColumnSizing();

                // My Queues
                myQueuesTable.fnClearTable();
                var myQueuesData = myQueuesFilterFn(queuesData);
                myQueuesTable.fnAddData(myQueuesData);
                myQueuesTable.fnSort(SORTING);
                myQueuesTable.fnAdjustColumnSizing();
            } else {
                var columns = [
                    /* Queue name */        {"sClass": "qm-table__first-column",
                        "mDataProp": "name",
                        "sDefaultContent" : null},
                    /* Queue id */          {"bSearchable": false,
                        "bVisible": false,
                        "mDataProp": "id",
                        "sDefaultContent" : null},
                    /* Queue waiting num */ {"sClass": "qm-table__middle-column qm-table__middle-column--right-align",
                        "mDataProp": "customersWaiting",
                        "sDefaultContent" : null},
                    /* Queue waiting time */{"sClass": "qm-table__last-column",
                        "mDataProp": "waitingTime",
                        "sDefaultContent" : null}
                ];
                var headerCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
                    //nHead.style.borderBottom = "1px solid #c0c0c0";
                    nHead.getElementsByTagName('th')[0].innerHTML = jQuery.i18n.prop('info.queue.name.short');
                    nHead.getElementsByTagName('th')[1].innerHTML = jQuery.i18n.prop('info.queue.waiting.short');
                    nHead.getElementsByTagName('th')[2].innerHTML = jQuery.i18n.prop('info.queue.waiting.time.short');
                };
				var t= new Date();
                var url = "/rest/servicepoint/branches/" + sessvars.branchId + "/queues?call="+t;
                var rowCallbackAllQueues = function(nRow, aData, iDisplayIndex) {
                    if(sessvars.state.servicePointState == servicePoint.servicePointState.OPEN &&
                        !(servicePoint.isOutcomeOrDeliveredServiceNeeded() /*&& sessvars.forceMark && !hasMark()*/)) {
                        var queueName = $('td:eq(0)', nRow).text();
                        $('td:eq(0)', nRow).empty().append("<a href='' class=\"qm-table__queue-name\" " +
                            "title=\"" + jQuery.i18n.prop("action.title.queue.click") + "\">" + queueName + "</a>");
        
                        $('td:eq(0) > a.qm-table__queue-name', nRow).click(function(e) {
                            e.preventDefault();
                            queueClicked(queuesTable, nRow);
                        });
                    } else {
                        $('td:eq(0)', nRow).addClass("qm-table__queue-name--disabled");
                    }
                    
                    $('td:eq(2)', nRow).html(util.formatIntoMM(parseInt(aData.waitingTime)));
                    return nRow;
                }; 

                var rowCallbackMyQueues = function(nRow, aData, iDisplayIndex) {
                    if(sessvars.state.servicePointState == servicePoint.servicePointState.OPEN &&
                        !(servicePoint.isOutcomeOrDeliveredServiceNeeded() /*&& sessvars.forceMark && !hasMark()*/)) {
                        var queueName = $('td:eq(0)', nRow).text();
                        $('td:eq(0)', nRow).empty().append("<a href='' class=\"qm-table__queue-name\" " +
                            "title=\"" + jQuery.i18n.prop("action.title.queue.click") + "\">" + queueName + "</a>");
        
                        $('td:eq(0) > a.qm-table__queue-name', nRow).click(function(e) {
                            e.preventDefault();
                            queueClicked(myQueuesTable, nRow);
                        });
                    } else {
                        $('td:eq(0)', nRow).addClass("qm-table__queue-name--disabled");
                    }
                    
                    $('td:eq(2)', nRow).html(util.formatIntoMM(parseInt(aData.waitingTime)));
                    return nRow;
                }; 

                queuesTable = util.buildTableJson({"tableId": "queues", "url": url, "rowCallback": rowCallbackAllQueues,
                    "columns": columns, "filter": false, "headerCallback": headerCallback, "emptyTableLabel": "info.queues.none", "scrollYHeight": "100%", "initFn": allQueuesInitFn});
                queuesTable.fnSort(SORTING);
                queuesTable.fnAdjustColumnSizing();

                myQueuesTable = util.buildTableJson({"tableId": "myQueuesTable", "url": url, "rowCallback": rowCallbackMyQueues,
                "columns": columns, "filter": false, "headerCallback": headerCallback, "emptyTableLabel": "info.queues.none", "scrollYHeight": "100%", "filterData": myQueuesFilterFn, "initFn": myQueuesInitFn});
                myQueuesTable.fnSort(SORTING);
                myQueuesTable.fnAdjustColumnSizing();
            }

            // Sadly clearing and adding data to the queue "data table" resets the position of our search result
            customer.positionCustomerResult();
        }
        if(keepCalling) {
            sessvars.queueTimer = setTimeout(function() {
                queues.updateQueues(true);
            }, queueRefeshTime*1000);
        }
    };

    var allQueuesInitFn = function (queues) {
        var waitingCustomers = getNumberOfWaitingCustomers(queues);
        setNumberOfWaitingCustomers('#allQueuesTab .qm-tab-information__text', waitingCustomers);
    };

    var myQueuesInitFn = function (queues) {
        var waitingCustomers = getNumberOfWaitingCustomers(queues);
        setNumberOfWaitingCustomers('#myQueuesTab .qm-tab-information__text', waitingCustomers);
    };

    var getNumberOfWaitingCustomers = function (queues) {
        return _.reduce(queues, function(sum, queue) {
            return sum + queue.customersWaiting; 
        }, 0);
    };

    var setNumberOfWaitingCustomers = function(selector, numberOfWaitingCustomers) {
        $(selector).text(numberOfWaitingCustomers);
    };

    var myQueuesFilterFn = function (queues) {
        var myQueueIds = window.myQueueIds || [];
        return _.filter(queues, function (queue) {
            return _.includes(window.myQueueIds, queue.id);
        });
    };

    var queueClicked = function(queueTableContainingRow, rowClicked) {
        if(servicePoint.hasValidSettings() && sessvars.state.servicePointState == servicePoint.servicePointState.OPEN &&
            !(servicePoint.isOutcomeOrDeliveredServiceNeeded() /*&& sessvars.forceMark && !hasMark()*/)) {
            sessvars.clickedQueueId = queueTableContainingRow.fnGetData(rowClicked).id; //ql queue id
            //util.showModal("ticketsDialogue");
            $('#queuesModule').hide();
            $('#queueDetailView').show();
            window.queuePopovers = [];
            if(typeof ticketsTable !== 'undefined') {
                //empty the tickets table and populate with new data from server if table is not created
                ticketsTable.fnClearTable();
                var params = {};
                params.branchId = sessvars.branchId;
                params.queueId = sessvars.clickedQueueId;
                var tickets = spService.get("branches/" + params.branchId + "/queues/" + params.queueId + "/visits/full");
                ticketsTable.fnAddData(tickets);
                ticketsTable.fnAdjustColumnSizing();
            } else {
                var columns = [
                    /* Id */                {"bSearchable": false,
                        "bVisible": false,
                        "mDataProp": "id"},

                    /* Ticket id */         {"sClass": "qm-table__first-column",
                        "mDataProp": "ticketId"},
                    /* Customer name */
                        {"sClass": "qm-table__middle-column",
                        "mData": null,
                        "sDefaultContent": ""},
                    /* Actions */      {"sClass": "qm-table__middle-column",
                        "mDataProp": "currentVisitService.serviceExternalName"},
                    /* Waiting time */      {"sClass": "qm-table__last-column",
                        "mDataProp": "waitingTime"}

                ];
                var headerCallback = function(nHead, aasData, iStart, iEnd, aiDisplay) {
                    //nHead.style.borderBottom = "1px solid #c0c0c0";
                    nHead.getElementsByTagName('th')[0].innerHTML = jQuery.i18n.prop('info.queue.tickets');
                    nHead.getElementsByTagName('th')[1].innerHTML = jQuery.i18n.prop('info.transfer.queue.name');
                    nHead.getElementsByTagName('th')[2].innerHTML = jQuery.i18n.prop('info.service.name');
                    nHead.getElementsByTagName('th')[3].innerHTML = jQuery.i18n.prop('info.queue.waiting.time');
                };
                var t = new Date();
                var url = "/rest/servicepoint/branches/" + sessvars.branchId + "/queues/" + sessvars.clickedQueueId + "/visits/full?call=" + t;
                var rowCallback = function(nRow, aData, iDisplayIndex) {
                    
                    if($('td:eq(0)', nRow).find('a').length == 0) {
                        //format ticket number
                        var ticketNumSpan = $("<a href='#' class='qm-table__ticket-code'>" + aData.ticketId + "</a>")
                        $('td:eq(0)', nRow).html(ticketNumSpan);
                        
                        // Templates
                        var popoverTemplate = document.querySelector('.qm-popover--queue').outerHTML.trim();
                        
                        // Popover options
                        var options = {
                            template: popoverTemplate,
                            popTarget: ticketNumSpan.get(0),
                            ticketId: aData.ticketId,
                            visitId: aData.id
                        };

                        // Popover options and initialization
                        if ( buttonTransferFromQueueEnabled  == true ) {						
                            //$('td:eq(1)', nRow).append("<span><a href=\"#\" class=\"transferTicket\" title=\"" + jQuery.i18n.prop("action.title.transfer") + "\"></a></span>");
                            options.showTransferBtn = true;
                        } else {
                            options.showTransferBtn = false;
                        }
						if ( buttonRemoveFromQueueEnabled == true ) {
                            //$('td:eq(1)', nRow).append("<span><a href=\"#\" class=\"removeTicket\" title=\"" + jQuery.i18n.prop("action.title.remove") + "\"></a></span>");
                            options.showDeleteBtn = true;
						} else {
                            options.showDeleteBtn = false;
                        }
						if ( buttonCallFromQueueEnabled  == true ) {						
                            //$('td:eq(1)', nRow).append("<span><a href=\"#\" class=\"callTicket\" title=\"" +  jQuery.i18n.prop("action.title.call.ticket")  + "\"></a></span>");
                            options.showCallBtn = true;
						} else {
                            options.showCallBtn = false;
                        }
                        
                        if(servicePoint.isOutcomeOrDeliveredServiceNeeded()) {
                            options.disableCall = true;
                            options.disableTransfer = true;
                            options.disableDelete = true;
                        }

                        var popover = new window.$Qmatic.components.popover.QueuePopoverComponent(options);
                        window.queuePopovers.push(popover);
                        popover.init();

                        var formattedTime = util.formatIntoMM(parseInt(aData.waitingTime));
                    }

                    if(aData.parameterMap['customers'] !== undefined) {
                        $('td:eq(1)', nRow).html(aData.parameterMap['customers']);
                    }

                    $('td:eq(3)', nRow).html(formattedTime);
                    return nRow;
                };

                //create new table since not defined
                ticketsTable = util.buildTableJson({"tableId": "tickets", "url": url, "rowCallback": rowCallback,
                    "columns": columns, "filter": false, "headerCallback": headerCallback, "scrollYHeight": "100%",
                    "emptyTableLabel": "info.queue.tickets.empty"});
            }

            //kill old event handlers
			if ( buttonTransferFromQueueEnabled  == true ) {
				$('tbody td span a.transferTicket', $('#tickets')).die('click');
			}
			if ( buttonRemoveFromQueueEnabled  == true ) {
				$('tbody td span a.removeTicket', $('#tickets')).die('click');
			}
			if ( buttonCallFromQueueEnabled  == true ) {
				$('tbody td span a.callTicket', $('#tickets')).die('click');
			}
	
			if ( buttonTransferFromQueueEnabled  == true ) {	
				$('tbody td span a.transferTicket', $('#tickets')).live('click', function() {
					var nTr = $(this).closest("tr").get(0);
					var aData = ticketsTable.fnGetData(nTr);
					transfer.transferTicketToQueueClicked(aData);
					util.hideModal('ticketsDialogue');
					return false;
				});
			}			

			if ( buttonRemoveFromQueueEnabled == true ) {
				$('tbody td span a.removeTicket', $('#tickets')).live('click', function() {
					var nTr = $(this).closest("tr").get(0);
					var aData = ticketsTable.fnGetData(nTr);
					removeTicketClicked(aData);
					util.hideModal('ticketsDialogue');
					return false;
				});
			}

			if ( buttonCallFromQueueEnabled  == true ) {			
				$('tbody td span a.callTicket', $('#tickets')).live('click', function() {
					var nTr = $(this).closest("tr").get(0);
					var aData = ticketsTable.fnGetData(nTr);
					callTicketClicked(aData);
					util.hideModal('ticketsDialogue');
					return false;
				});
			}
            $("#ticketListHeader").empty();
            $("#ticketListHeader").html(translate.msg("info.list.of.tickets.in", [queueTableContainingRow.fnGetData(rowClicked).name]));
        }
    };

    this.emptyQueues = function() {
        queuesTable.fnClearTable();
        myQueuesTable.fnClearTable();
    };
    // TODO: Remove
    var removeTicketClicked = function(aRowData) {
        if(servicePoint.hasValidSettings()) {
            var params = servicePoint.createParams();
            params.queueId = sessvars.clickedQueueId;
            params.visitId = aRowData.visitId;
            spService.del("branches/"+params.branchId+"/servicePoints/"+params.servicePointId+"/visits/"+params.visitId);
            queues.updateQueues(false);
        }
    };

    this.removeTicket = function (visitId) {
        if(servicePoint.hasValidSettings()) {
            var params = servicePoint.createParams();
            params.queueId = sessvars.clickedQueueId;
            params.visitId = visitId;
            spService.del("branches/"+params.branchId+"/servicePoints/"+params.servicePointId+"/visits/"+params.visitId);
            queues.updateQueues(false);
        }
    };

    this.callFromQueue = function (visitId) {
        if(servicePoint.hasValidSettings()) {
            var params = servicePoint.createParams();
            params.queueId = sessvars.clickedQueueId;
            params.visitId = visitId;
			userPoolUpdateNeeded = false;
			spPoolUpdateNeeded = false;
			sessvars.state = servicePoint.getState(spService.post("branches/"+params.branchId+"/servicePoints/"+params.servicePointId+"/visits/"+params.visitId));
			queues.updateQueues(false);
			if (sessvars.state.visitState == "CALL_NEXT_TO_QUICK") {
				util.showError(jQuery.i18n.prop("info.call.next.to.quick"));
			} else {
				sessvars.statusUpdated = new Date();
				servicePoint.updateWorkstationStatus();
				sessvars.currentCustomer = null;
			}
        }
    };

	var callTicketClicked = function(aRowData) {
        if(servicePoint.hasValidSettings()) {
            var params = servicePoint.createParams();
            params.queueId = sessvars.clickedQueueId;
            params.visitId = aRowData.visitId;
			userPoolUpdateNeeded = false;
			spPoolUpdateNeeded = false;
			sessvars.state = servicePoint.getState(spService.post("branches/"+params.branchId+"/servicePoints/"+params.servicePointId+"/visits/"+params.visitId));
			queues.updateQueues(false);
			if (sessvars.state.visitState == "CALL_NEXT_TO_QUICK") {
				util.showError(jQuery.i18n.prop("info.call.next.to.quick"));
			} else {
				sessvars.statusUpdated = new Date();
				servicePoint.updateWorkstationStatus();
				sessvars.currentCustomer = null;
			}
        }
    };
};