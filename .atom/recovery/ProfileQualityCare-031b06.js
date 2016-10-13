//Patient Survey Results Tab
function BuildQualityTable() {
    var contentDiv = jQuery('<div/>', { "class": "row-fluid tab-intro-row" });
    contentDiv.append('<div class="span12"><div id="qualityColHead" class="tab-intro-content tab-intro-content-border profile-info"></div></div>');

    var contentDiv7 = jQuery('<div/>');
    contentDiv7.append(expandCollapseHdrAndSection('Quality of patient care star ratings', 'quality-tab-content6'));
    var contentDiv2 = jQuery('<div/>');
    contentDiv2.append(expandCollapseHdrAndSection('Managing daily activities', 'quality-tab-content1', true));
    var contentDiv3 = jQuery('<div/>');
    contentDiv3.append(expandCollapseHdrAndSection('Managing pain and treating symptoms', 'quality-tab-content2', true));
    var contentDiv4 = jQuery('<div/>');
    contentDiv4.append(expandCollapseHdrAndSection('Treating wounds and preventing pressure', 'quality-tab-content3', true));
    var contentDiv5 = jQuery('<div/>');
    contentDiv5.append(expandCollapseHdrAndSection('Preventing harm', 'quality-tab-content4', true));
    var contentDiv6 = jQuery('<div/>');
    contentDiv6.append(expandCollapseHdrAndSection('Preventing unplanned hospital care', 'quality-tab-content5', true));
    var contentDiv8 = jQuery('<div/>');
    contentDiv8.append(expandCollapseHdrAndSection('Quality measures', 'quality-tab-content8'));
    $('#contentTab2 div.ui-tabs-content-container').append(contentDiv).append(contentDiv2).append(contentDiv3).append(contentDiv4)
                                                   .append(contentDiv5).append(contentDiv6).append(contentDiv8);

    if (currentView == mqView.desktop || currentView == mqView.tabletPortrait) {
        $('#contentTab2 div.ui-tabs-content-container').append(contentDiv).append(contentDiv7).append(contentDiv2).append(contentDiv3).append(contentDiv4).append(contentDiv5).append(contentDiv6).append(contentDiv8);
    } else {
        $('#tab-1 div.ui-tabs-content-container').append(contentDiv).append(contentDiv7).append(contentDiv2).append(contentDiv3).append(contentDiv4).append(contentDiv5).append(contentDiv6).append(contentDiv8);
    }
    $('#quality-tab-content6').append('<div id="ratingTable" class="profile"></div>');
    $('#quality-tab-content1').append('<div id="activityTable" class="profile"></div>');
    $('#quality-tab-content2').append('<div id="symptomTable" class="profile"></div>');
    $('#quality-tab-content3').append('<div id="soreTable" class="profile"></div>');
    $('#quality-tab-content4').append('<div id="harmTable" class="profile"></div>');
    $('#quality-tab-content5').append('<div id="unplannedTable" class="profile"></div>');

    //reloocate content sections under the quality measures content
    jQuery('#quality-tab-content1').parent().detach().appendTo('#quality-tab-content8');
    jQuery('#quality-tab-content2').parent().detach().appendTo('#quality-tab-content8');
    jQuery('#quality-tab-content3').parent().detach().appendTo('#quality-tab-content8');
    jQuery('#quality-tab-content4').parent().detach().appendTo('#quality-tab-content8');
    jQuery('#quality-tab-content5').parent().detach().appendTo('#quality-tab-content8');

    //auto expand 2nd level content in desktop/tablet portrait views
    if (viewType == mqView.tabletPortrait || viewType == mqView.desktop) {
        $(".collapsed").addClass("expanded").removeClass("collapsed");
        $(".collapse").addClass("in");
    }
}

function callQualityData(FormatedData, HHCId, ZIP) {
    //$('#qualityColHead').append(FormatedData[0].ColHead);
    var state = SharedFunctions.getStateSelected(FormatedData);
    var providers = HHCId + "," + state + ",Nation";
    var link = "\/HomeHealthCompare\/About\/Managing-Daily-Activities.html";
    var graphParams = "Prnt1|" + providers + "|" + state + "|" + link;
    var QFdata = SharedFunctions.getQFdata(FormatedData, providers, graphParams);
    handleGraphPrint();
    //displayFootnotesByView('footnotesTab2');
}  //callSurveyData "DAILY","PAIN","SORES","HARM","UNPLANNED"

function processqualityresults(QFdata, providers, graphParams, FormatedData) {
    if ($('#Table_daily').length == "0") {
        QFdata = SharedFunctions.transformData(QFdata);
        var globalFootNoteList = new Array();
        var tab = "Quality"
        var url = "";
        var link = "\/HomeHealthCompare\/About\/Managing-Daily-Activities.html";
        var title = "Select here to view what is it and why is it important";
        var ColumnHeaderData = SharedFunctions.getColHeader(FormatedData, tab);
        if (QFdata != null && QFdata.tableLables.length > 0) {
            for (var i = 0; i < QFdata.tableLables.length; i++) {
                if (QFdata.tableLables[i].MeasureCode.toLowerCase() == 'daily' ||
                QFdata.tableLables[i].MeasureCode.toLowerCase() == 'pain' ||
                QFdata.tableLables[i].MeasureCode.toLowerCase() == 'rating' ||
                QFdata.tableLables[i].MeasureCode.toLowerCase() == 'sores' ||
                QFdata.tableLables[i].MeasureCode.toLowerCase() == 'harm' ||
                QFdata.tableLables[i].MeasureCode.toLowerCase() == 'unplanned') {
                    if (QFdata.tableLables[i].MeasureCode.toLowerCase() == 'rating') {
                        $('#ratingTable').append('<div class="desc">' + QFdata.tableLables[i].MeasureDesc + '</div><hr style="width:100%;margin: 0px;" />');
                        $('#ratingTable').BindToTable({ TableCode: QFdata.tableLables[i].MeasureCode, ColHeadData: ColumnHeaderData, QFdata: QFdata, TableClass: "content-table resp-wrap-table", rowBkgGradient: true });

                        if (QFdata.tableLables[i].MeasureCode.toLowerCase() === 'rating') {
                            //open new window to display graphs for star ratings
                            var id = getParameterByName('ID'),
                                stateID = SharedFunctions.getStateSelected(FormatedData),
                                footnoteNum = FormatedData[0].Ftnt_ID;

                            $('#Table_rating').before('<div id="Table_rating_graphbuttons" class="table-footer-link"><a href="/HomeHealthCompare/starratings.html#cmprID=' + id + '&ftNoteList=' + footnoteNum + '&stsltd=' + stateID + '" target="_blank" id="" title="Show graphs for Quality of patient care star ratings" class="btn green-button btn-qm-graphs-tables">Show Graphs<span class="HiddenText"></span></a></div>');
                        } else {
                            $('#Table_rating').before(createGraphButtonHTML(QFdata.tableLables[i].MeasureCode.toLowerCase(), QFdata.tableLables[i].MeasureName, null, '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\'', '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\''));
                        }
                           $('#Table_rating').attr('summary', 'This table provides a comparison for quality of patient care star rating. You may also choose the show graphs button to gain more insight into the data being presented.');
                    }
                    if (QFdata.tableLables[i].MeasureCode.toLowerCase() == 'daily') {
                        $('#activityTable').append('<div class="desc">' + QFdata.tableLables[i].MeasureDesc + '</div><hr style="width:100%;margin: 0px;" />');
                        $('#activityTable').BindToTable({ TableCode: QFdata.tableLables[i].MeasureCode, ColHeadData: ColumnHeaderData, QFdata: QFdata, TableClass: "content-table resp-wrap-table", rowBkgGradient: true });
                        $('#Table_daily').before(createGraphButtonHTML(QFdata.tableLables[i].MeasureCode.toLowerCase(), QFdata.tableLables[i].MeasureName, null, '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\'', '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\''));
                        var tableSummaryId = $('#Table_daily').parent().parent().parent().children('.collapse-header-tan').children('h3').children('span').text();
                        $('#Table_daily').attr('summary', 'This table provides a list of providers chosen for comparison along with their phone number. Each provider column is presented with the quality measures for ' + tableSummaryId + '. You may also choose the show graphs button to gain more insight into the data being presented. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can select the footnote number to hear the footnote text announced.');
					}
                    if (QFdata.tableLables[i].MeasureCode.toLowerCase() == 'pain') {
                        $('#symptomTable').append('<div class="desc">' + QFdata.tableLables[i].MeasureDesc + '</div><hr style="width:100%;margin: 0px;" />');
                        $('#symptomTable').BindToTable({ TableCode: QFdata.tableLables[i].MeasureCode, ColHeadData: ColumnHeaderData, QFdata: QFdata, TableClass: "content-table resp-wrap-table", rowBkgGradient: true });
                        $('#Table_pain').before(createGraphButtonHTML(QFdata.tableLables[i].MeasureCode.toLowerCase(), QFdata.tableLables[i].MeasureName, null, '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\'', '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\''));
                        var tableSummaryId = $('#Table_pain').parent().parent().parent().children('.collapse-header-tan').children('h3').children('span').text();
                        $('#Table_pain').attr('summary', 'This table provides a list of providers chosen for comparison along with their phone number. Each provider column is presented with the quality measures for ' + tableSummaryId + '. You may also choose the show graphs button to gain more insight into the data being presented. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can select the footnote number to hear the footnote text announced.');
					}
                   
                    if (QFdata.tableLables[i].MeasureCode.toLowerCase() == 'sores') {
                        $('#soreTable').append('<div class="desc">' + QFdata.tableLables[i].MeasureDesc + '</div><hr style="width:100%;margin: 0px;" />');
                        $('#soreTable').BindToTable({ TableCode: QFdata.tableLables[i].MeasureCode, ColHeadData: ColumnHeaderData, QFdata: QFdata, TableClass: "content-table resp-wrap-table", rowBkgGradient: true });
                        $('#Table_sores').before(createGraphButtonHTML(QFdata.tableLables[i].MeasureCode.toLowerCase(), QFdata.tableLables[i].MeasureName, null, '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\'', '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\''));
                        var tableSummaryId = $('#Table_sores').parent().parent().parent().children('.collapse-header-tan').children('h3').children('span').text();
                        $('#Table_sores').attr('summary', 'This table provides a list of providers chosen for comparison along with their phone number. Each provider column is presented with the quality measures for ' + tableSummaryId + '. You may also choose the show graphs button to gain more insight into the data being presented. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can select the footnote number to hear the footnote text announced.');
					}
                    if (QFdata.tableLables[i].MeasureCode.toLowerCase() == 'harm') {
                        $('#harmTable').append('<div class="desc">' + QFdata.tableLables[i].MeasureDesc + '</div><hr style="width:100%;margin: 0px;" />');
                        $('#harmTable').BindToTable({ TableCode: QFdata.tableLables[i].MeasureCode, ColHeadData: ColumnHeaderData, QFdata: QFdata, TableClass: "content-table resp-wrap-table", rowBkgGradient: true });
                        $('#Table_harm').before(createGraphButtonHTML(QFdata.tableLables[i].MeasureCode.toLowerCase(), QFdata.tableLables[i].MeasureName, null, '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\'', '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\''));
                        var tableSummaryId = $('#Table_harm').parent().parent().parent().children('.collapse-header-tan').children('h3').children('span').text();
                        $('#Table_harm').attr('summary', 'This table provides a list of providers chosen for comparison along with their phone number. Each provider column is presented with the quality measures for ' + tableSummaryId + '. You may also choose the show graphs button to gain more insight into the data being presented. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can select the footnote number to hear the footnote text announced.');
					}
                    if (QFdata.tableLables[i].MeasureCode.toLowerCase() == 'unplanned') {
                        link = "\/HomeHealthCompare\/About\/Preventing-Unplanned-Care.html";
                        $('#unplannedTable').append('<div class="desc">' + QFdata.tableLables[i].MeasureDesc + '</div><hr style="width:100%;margin: 0px;" />');
                        $('#unplannedTable').BindToTable({ TableCode: QFdata.tableLables[i].MeasureCode, ColHeadData: ColumnHeaderData, QFdata: QFdata, TableClass: "content-table resp-wrap-table", rowBkgGradient: true });
                        $('#Table_unplanned').before(createGraphButtonHTML(QFdata.tableLables[i].MeasureCode.toLowerCase(), QFdata.tableLables[i].MeasureName, null, '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\'', '\'' + QFdata.tableLables[i].MeasureCode.toLowerCase() + '\',\'' + graphParams + '\',\'' + link + '\',\'1\''));
                        $('#Table_unplanned').attr('summary', 'The Preventing unplanned hospital care table lists the 2 preventing unplanned hospital care measures and their scores for the selected Home Health Agencies. This table also includes the State and National scores for these 2 measures. The Home health agencies name and address will be displayed in each column. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can hover over the footnote number to see the footnote text.');
                    }

                    // footnotes for mobile and non mobile view
                    var subFootNoteList = getFootNoteList(QFdata, QFdata.tableLables[i].MeasureCode);
                    addAllfootnotes(subFootNoteList, globalFootNoteList);
                    addAllfootnotes(subFootNoteList, allTabsFootnoteList);
                } //end if
            } //end for
        } //end if
                 $('#Table_rating').prepend('<caption class="HiddenText"><h3>Home Health Quality of Patient Care Star Rating</h3></caption>');
        $('#Table_daily').prepend('<caption class="HiddenText"><h3>Home Health Managing Daily Activities</h3></caption>');
        $('#Table_pain').prepend('<caption class="HiddenText"><h3>Home Health Managing Pain and Treating Symptoms</h3></caption>');
        $('#Table_sores').prepend('<caption class="HiddenText"><h3>Home Health Treating Wounds and Preventing Pressure Sores</h3></caption>');
        $('#Table_harm').prepend('<caption class="HiddenText"><h3>Home Health Preventing Harm</h3></caption>');
        $('#Table_unplanned').prepend('<caption class="HiddenText"><h3>Home Health Preventing Unplanned Hospital Care</h3></caption>');
        SharedFunctions.addFormattedDatafootnotes(globalFootNoteList, FormatedData);
        SharedFunctions.addFormattedDatafootnotes(allTabsFootnoteList, FormatedData);

        var tempRow = $('#Table_unplanned thead tr').children().clone().toArray();
        var tempRowLength = tempRow.length;
        var subTableHead = "";

        $('#quality-tab-content5').html($('#quality-tab-content5').html() + "<table id='Table_unplanned2' class='content-table resp-wrap-table compare' cellpading='0' cellspacing='0'><thead></thead><tbody></tbody></table>");
        $('#Table_unplanned2').attr('summary', 'The Preventing unplanned hospital care table lists the 2 readmission measures and their scores for the selected Home Health Agencies. The scores would be a bucket value. The Home health agencies name and address will be displayed in each column. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can hover over the footnote number to see the footnote text.');

        for (i = 0; i < tempRowLength; i++) {
            if (i < (tempRowLength - 2)) {

                subTableHead = (subTableHead + $('<div>').append(tempRow[i]).html());
            }
        }
        profileRemoveStateAndNational("U_REHOSP_LEVEL");
        profileRemoveStateAndNational("U_EDUSE_NOHOSP_LEVEL");

        $('#Table_unplanned2 thead').html(("<tr class='generalInfo'>" + subTableHead + "</tr>"));
        tempRow = $("#Table_unplanned tbody").children().toArray();
        tempRowLength = tempRow.length;
        $('#Table_unplanned2 tbody').append(tempRow[2]);
        $('#Table_unplanned2 tbody').append(tempRow[3]);
       
        getStarRating();
        if ($('#footnotesTab2').length == "0") {
            // create footnote div for the tab and add the footnotes to it
            $('#profFootnotes').append('<div id="footnotesTab2" />');
            appendFootNoteDescToContainer(globalFootNoteList, 'footnotesTab2', addDaggerToDesc, 'homehealthservices');
        }
        $('[abbr=""]').removeAttr('abbr');
        // collapse sections if mobile view
        if (viewType == mqView.phone || viewType == mqView.phonePortrait || viewType == mqView.tabletPortrait) {
            updateTableWidth('Table_daily');
        }
    }

    if (getParameterByName('profTab', 'reNegDigit') == -1) {
        disableLinksforPrint();
        $('#contentTab2 .ui-tabs-panel-content .ui-tabs-content-container div .collapse-header-gray').removeAttr('data-toggle').addClass('inactive').removeAttr('href');
        $('#contentTab2 .ui-tabs-panel-content .ui-tabs-content-container div .collapse-header-gray i').removeAttr('title');
    } else {
        // fire tooltips
        $(".info").tooltip({ position: { my: "center top", at: "center top", offset: "0 25px", collision: "fit"} });
    }
    expand508Adjust();
    $("h1").focus();
}
// remove nation and state measure details for measure rating row
// @input the id of the measure table to be removed
function profileRemoveStateAndNational(id) {
    var measureRow;
    var rowLength;
    measureRow = $(("#" + id)).parent().children().toArray();
    rowLength = measureRow.length;
    for (i = 0; i < rowLength; i++) {
        if (i >= (rowLength - 2)) {
            $(measureRow[i]).remove();
        }

    }
    measureRow[1].setAttribute("colspan", "3");
    measureRow[1].setAttribute("style", "text-align:center");
    
    
}





