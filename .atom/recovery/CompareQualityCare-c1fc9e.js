//Quality of Patient care Tab
function callQualityData(FormatedData, HHCId, ZIP) {
    $('#tab1').die(); // remove the click function
    if ($('#pain-tab-content table').length == "0") {
        var state = SharedFunctions.getStateSelected(FormatedData);
        var providers = state + ",Nation";
        var link = "\/HomeHealthCompare\/About\/Managing-Daily-Activities.html";
        var graphParams = "Prnt1|" + providers + "|" + state + "|" + link;
        var formatedData = SharedFunctions.addextraProviders(FormatedData, state);
        var QFdata = SharedFunctions.getQFdata(formatedData, getParameterByName("cmprID") + "," + providers, graphParams);
        handleGraphPrint();
    }
}  //callQualityData "DAILY","PAIN","SORES","HARM","UNPLANNED"

function PopulateQualityTablesNew(QFdata, graphParams, formattedData) {
    var QFdata = SharedFunctions.transformData(QFdata);
    
    if (QFdata !== null && QFdata.tableLables.length > 0) {
        var headerId = "",
            headerName = "",
            measureInfoDiv = "",
            globalFootNoteList = [];
            mainDiv = $('div.tab-1-content-container'),
            link = "\/HomeHealthCompare\/About\/Managing-Daily-Activities.html";
        
        mainDiv.attr('class', 'tab-1-content-container dataTabContainer');
        
        for (var i = 0; i < QFdata.tableLables.length; i++) {
            var subFootNoteList;
            var url = "";
            var title = "";
            
            if (QFdata.tableLables[i].MeasureCode.toLowerCase() === 'rating' || QFdata.tableLables[i].MeasureCode.toLowerCase() === 'daily' || QFdata.tableLables[i].MeasureCode.toLowerCase() === 'pain' || QFdata.tableLables[i].MeasureCode.toLowerCase() === 'sores'
                || QFdata.tableLables[i].MeasureCode.toLowerCase() === 'harm' || QFdata.tableLables[i].MeasureCode.toLowerCase() === 'unplanned') {
               
                headerId = QFdata.tableLables[i].MeasureCode.toLowerCase();
                headerName = QFdata.tableLables[i].MeasureName;
                headerName = headerName.charAt(0) + headerName.substr(1).toLowerCase();
                
                if (QFdata.tableLables[i].MeasureCode.toLowerCase() === 'rating') {
                    mainDiv.append(expandCollapseHdrAndSection(headerName, headerId + '-tab-content'));
                    mainDiv.append(expandCollapseHdrAndSection("Quality measures","quality-tab-content8"));
                }
                else
                    mainDiv.append("<div>" + expandCollapseHdrAndSection(headerName, headerId + '-tab-content', true) + "</div>");
                var toggleContentDiv = $('#' + headerId + '-tab-content');
                toggleContentDiv.append('<div class="desc">' + QFdata.tableLables[i].MeasureDesc + '</div><hr style="width:100%;margin: 0px;" />');
                toggleContentDiv.BindToTable({ TableCode: QFdata.tableLables[i].MeasureCode, ColHeadData: formattedData, QFdata: QFdata,
                    GraphParams: graphParams, GraphButtonHiddenText: QFdata.tableLables[i].MeasureName, TableClass: "content-table resp-wrap-table compare",
                    rowBkgGradient: true
                });

                if(headerId == 'unplanned'){
                    link = "\/HomeHealthCompare\/About\/Preventing-Unplanned-Care.html";
                }

                if (QFdata.tableLables[i].MeasureCode.toLowerCase() === 'rating') {
                    //open new window to display graphs for star ratings
                    var ids = getParameterByName('cmprID'),
                        stateID = SharedFunctions.getStateSelected(formattedData),
                        footnoteNumList = '';

                    //grab ftnoteid for each provider to pass url param to star ratings graph page
                    $.each(formattedData, function () {
                        if (this.ID.length !== 2 && this.ID !== "NATION") {
                            footnoteNumList += this.Ftnt_ID + ",";
                        }
                    });

                    //remove last comma
                    footnoteNumList = footnoteNumList.substring(0, footnoteNumList.length - 1);

                    //create star ratings view graph button
                    $('#Table_' + headerId).before('<div id="Table_rating_graphbuttons" class="table-footer-link"><a href="/HomeHealthCompare/starratings.html#cmprID=' + encodeURIComponent(ids) + '&ftNoteList=' + encodeURIComponent(footnoteNumList) + '&stsltd=' + stateID + '" target="_blank" id="starRatingLink" title="Show graphs for quality of patient care star ratings" class="btn green-button btn-qm-graphs-tables">Show Graphs<span class="HiddenText"></span></a></div>');
                    $('#Table_' + headerId).attr('summary', 'This table provides a list of providers chosen for comparison along with their phone number. Each provider column is presented with the quality of patient care star rating. You may also choose the show graphs button to gain more insight into the data being presented. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison.');
                } else {
                    $('#Table_' + headerId).before(createGraphButtonHTML(headerId, QFdata.tableLables[i].MeasureName, null, '\'' + headerId + '\',\'' + graphParams + '\',\'' + link + '\',\'1\'', '\'' + headerId + '\',\'' + graphParams + '\',\'' + link + '\',\'1\''));
                    var tableSummaryId = $('#Table_' + headerId).parent().parent().children('.collapse-header-tan').children('h3').children('span').text();
                   
					$('#Table_' + headerId).attr('summary', 'This table provides a list of providers chosen for comparison along with their phone number. Each provider column is presented with the quality measures for ' + tableSummaryId + '. You may also choose the show graphs button to gain more insight into the data being presented. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can select the footnote number to hear the footnote text announced.');
                }

                if (headerId == 'unplanned') {
                    $('#Table_' + headerId).attr('summary', 'The Preventing unplanned hospital care table lists the 2 preventing unplanned hospital care measures and their scores for the selected Home Health Agencies. This table also includes the State and National scores for these 2 measures. The Home health agencies name and address will be displayed in each column. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can hover over the footnote number to see the footnote text.');
                }

                // footnotes for mobile and non mobile view
                populateFootnoteListByProvTab(QFdata, QFdata.tableLables[i].MeasureCode, 'footnotesTab2', provByFootnoteList, provByTabFootnoteList);
                var subFootNoteList = getFootNoteList(QFdata, QFdata.tableLables[i].MeasureCode);
                addAllfootnotes(subFootNoteList, globalFootNoteList);
                addAllfootnotes(subFootNoteList, allTabsFootnoteList);
            }  //end if
        } //end for

        if ($('#footnotesTab2').length == "0") {
            // create footnote div for the tab and add the footnotes to it
            $('#cmprFootnotes').append('<div id="footnotesTab2" />');
            appendFootNoteDescToContainer(allTabsFootnoteList, 'footnotesTab2', addDaggerToDesc, 'homehealthservices');
        }

        $('[id^=blankCell]').attr('abbr', 'Measure Name');

        // add summary attribute descriptions to data tables
        $('#Table_rating').prepend('<caption class="HiddenText"><h2>Home Health Quality of Patient Care Star Rating</h2></caption>');
        $('#Table_daily').prepend('<caption class="HiddenText"><h2>Home Health Managing Daily Activities</h2></caption>');
        $('#Table_pain').prepend('<caption class="HiddenText"><h2>Home Health Managing Pain and Treating Symptoms</h2></caption>');
        $('#Table_sores').prepend('<caption class="HiddenText"><h2>Home Health Treating Wounds and Preventing Pressure Sores</h2></caption>');
        $('#Table_harm').prepend('<caption class="HiddenText"><h2>Home Health Preventing Harm</h2></caption>');
        $('#Table_unplanned').prepend('<caption class="HiddenText"><h2>Home Health Preventing Unplanned Hospital Care</h2></caption>');
        
        //reloocate content sections under the quality measures content
        jQuery('#daily-tab-content').parent().detach().appendTo('#quality-tab-content8');
        jQuery('#pain-tab-content').parent().detach().appendTo('#quality-tab-content8');
        jQuery('#sores-tab-content').parent().detach().appendTo('#quality-tab-content8');
        jQuery('#harm-tab-content').parent().detach().appendTo('#quality-tab-content8');
        jQuery('#unplanned-tab-content').parent().detach().appendTo('#quality-tab-content8');

        //auto expand 2nd level content in desktop/tablet portrait views
        if (viewType == mqView.tabletPortrait || viewType == mqView.desktop) {
            $(".collapsed").addClass("expanded").removeClass("collapsed");
            $(".collapse").addClass("in");
        }

        collapsed508Hide(mainDiv);

        var tempRow = $('#Table_unplanned thead tr').children().clone().toArray();
        var tempRowLength = tempRow.length;
        var subTableHead = "";

        $('#unplanned-tab-content').html($('#unplanned-tab-content').html() + "<table id='Table_unplanned2' class='content-table resp-wrap-table compare' cellpading='0' cellspacing='0'><thead></thead><tbody></tbody></table>");
        $('#Table_unplanned2').attr('summary', 'The Preventing unplanned hospital care table lists the 2 readmission measures and their scores for the selected Home Health Agencies. The scores would be a bucket value. The Home health agencies name and address will be displayed in each column. Selecting the Add to My Favorites link will add this home health agency to the favorites list. Selecting the remove home health agency link will remove the home health agency name from comparison. When a footnote is present within the table for a data point, you can hover over the footnote number to see the footnote text.');
        
        for (i = 0; i < tempRowLength; i++) {
            if (i < (tempRowLength - 2)) {
                subTableHead = (subTableHead + $('<div>').append(tempRow[i]).html());
            }
        } 
        compareRemoveStateAndNational("U_REHOSP_LEVEL");
        compareRemoveStateAndNational("U_EDUSE_NOHOSP_LEVEL");

        $('#Table_unplanned2 thead').html(("<tr class='generalInfo'>" + subTableHead + "</tr>"));
        tempRow = $("#Table_unplanned tbody").children().toArray();
        tempRowLength = tempRow.length;
        $('#Table_unplanned2 tbody').append(tempRow[2]);
        $('#Table_unplanned2 tbody').append(tempRow[3]);
        $('#Table_unplanned2').prepend('<caption class="HiddenText"><h2>Home Health Preventing Unplanned Hospital Care</h2></caption>');
        
        getStarRating();
        var desc = ["Managing daily activities", "Managing pain and treating symptoms", "Treating wounds and preventing pressure sores (bedsores)", "Preventing harm", "Preventing unplanned hospital care"];
        $('div.tab-1-content-container tr#showHideRow').each(function (index, Elm) {
            $(this).children('th:first').attr("abbr", desc[index]);
        });

        $('[abbr=""]').removeAttr('abbr');

        // add graphs in tab to array for use when providers are removed in removeID function
        var graphIndex = graphList.length;
        graphList[graphIndex] = new Array();
        graphList[graphIndex][0] = "Table_daily";
        graphList[graphIndex][1] = graphParams;
        graphList[graphIndex][2] = link;
        graphList[graphIndex][3] = "daily-toggle-graph";
        graphIndex++;
        graphList[graphIndex] = new Array();
        graphList[graphIndex][0] = "Table_pain";
        graphList[graphIndex][1] = graphParams;
        graphList[graphIndex][2] = link;
        graphList[graphIndex][3] = "pain-toggle-graph";
        graphIndex++;
        graphList[graphIndex] = new Array();
        graphList[graphIndex][0] = "Table_sores";
        graphList[graphIndex][1] = graphParams;
        graphList[graphIndex][2] = link;
        graphList[graphIndex][3] = "sores-toggle-graph";
        graphList[graphIndex] = new Array();
        graphList[graphIndex][0] = "Table_harm";
        graphList[graphIndex][1] = graphParams;
        graphList[graphIndex][2] = link;
        graphList[graphIndex][3] = "harm-toggle-graph";
        graphList[graphIndex] = new Array();
        graphList[graphIndex][0] = "Table_unplanned";
        graphList[graphIndex][1] = graphParams;
        graphList[graphIndex][2] = link;
        graphList[graphIndex][3] = "unplanned-toggle-graph";

        // collapse sections if mobile view
        if (viewType == mqView.phone || viewType == mqView.phonePortrait || viewType == mqView.tabletPortrait) {
            updateTableWidth('Table_rating');
            updateTableWidth('Table_daily');
            updateTableWidth('Table_pain');
            updateTableWidth('Table_sores');
            updateTableWidth('Table_harm');
            updateTableWidth('Table_unplanned');
            updateTableWidth('Table_unplanned2');
        }  
    }

    if (getParameterByName('cmprTab', 'reNegDigit') == -1) {
        disableCmprLinksforPrint();
        HHCPrintFiveColumns('Table_daily', '2px', '250px', '14px');
        HHCPrintFiveColumns('Table_pain', '2px', '250px', '14px');
        HHCPrintFiveColumns('Table_sores', '2px', '250px', '14px');
        HHCPrintFiveColumns('Table_harm', '2px', '250px', '14px');
        HHCPrintFiveColumns('Table_unplanned', '2px', '250px', '14px');
        HHCPrintFiveColumns('Table_unplanned2', '2px', '250px', '14px');
        
        $('#contentTab2 .bluetab-content .dataTabContainer .collapse-header-gray').removeAttr('data-toggle').addClass('inactive').removeAttr('href');
        $('#contentTab2 .bluetab-content .dataTabContainer .collapse-header-gray i').removeAttr('title');
    } else {
        // fire tooltips
        $(".info").tooltip({ position: { my: "center top", at: "center top", offset: "0 25px", collision: "fit"} });
    }

    expand508Adjust();
    setTimeout(function () {
        tableHeight("contentTab2");
    }, 1000);
    $("h1").focus();
}
// remove nation and state measure details for measure rating row
// @input the id of the measure table to be removed
function compareRemoveStateAndNational(id) {
    var measureRow;
    var rowLength;
    measureRow = $(("#" + id)).parent().children().toArray();
    rowLength = measureRow.length;
    for (i = 0; i < rowLength; i++) {
        if (i >= (rowLength - 2)) { 
            $(measureRow[i]).remove();
        }
        if (i > 0)
            measureRow[i].setAttribute("style", "text-align:center");
    }
}