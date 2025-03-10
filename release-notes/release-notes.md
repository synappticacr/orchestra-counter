<h1>Release notes Orchestra Web Counter 5</h1>

----------

<h2>Introduction</h2>

This document describes the new features, bug corrections, known issues and recommendations for Orchestra Web Counter 5. If you want to know about connector changes details or similar, this document is for you.

**Note:** Several of the remarks refer to a Jira number (Jira is Qmatic&#39;s internal registration system for bugs), or Pivotal Tracker (internal system for improvements and other issues).

<h2>Version 5.1.0</h2>

**Date: 29/07/2022**

**Build number: 1**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-614** | **PWC - Notes field in queue view** |
| **COUNTER-604** | **Counter in VM - Link back to Experience cloud portal** |
| **COUNTER-599** | **Update favicon** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-607** | **Sorting of All Queues** |

----------

<h2>Version 5.0.2</h2>

**Date: 09/06/2022**

**Build number: 3**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-603** | **Link Question-mark to ExpCloud user guide (in ExpCloud version of Counter)** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-606** | **Counter > Recall, Recycle and Noshow buttons get disabled after "Send SMS" and Page reload** |
| **COUNTER-600** | **Problem in tab behaviour in experience portal** |
| **COUNTER-608** | **Note get hidden when another user do a transfer.** |
| **COUNTER-605** | **Polish Font problem.** |

----------

<h2>Version 5.0.1</h2>

**Date: 29/03/2022**

**Build number: 9**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-582** | **Apply encoded related changes into the core version** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-589** | **Apply encoded related changes into the core version** |

----------

<h2>Version 5.0.0</h2>

**Date: 25/02/2022**

**Build number: 01**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-11604** | **Re-branding Counter webapp** |
| **QP-11741** | **Re-branding Counter webapp changes** |

----------



<h2>Version 4.1.1</h2>

**Date: 24/02/2022**

**Build number: 2**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-11757** | **All branches are shown regardless of the users access rights** |

----------

<h2>Version 4.1.0</h2>

**Date: 08/02/2022**

**Build number: 8**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-10771** | **Counter Advanced Search searching for customers** |
| **QP-10282** | **Counterterminal queue should indicate when and appointment is multi person or multi service** | 
| **QP-11086** | **Add new Customer - DoB upto current day should be allowed to match with AB-412** |
| **QP-11400** | **"send SMS" not checked default** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9944** | **title of the counter web app should be changed to "Counter"** |
| **QP-11127** | **Wrong DoB field is highlighted.** |
| **QP-11403** | **Applications like workstation terminal should not be translated based on the browser language.** |

**Note:** In order to work **QP-10282** correctly, Concierge 4.1.0, Appointment Booking 4.1.0 and Mobile Ticket 1.15.0 applications are required.

----------

<h2>Version 4.0.0.046</h2>

**Date: 22/09/2021**

**Build number: 046**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9122** | **Counter: Improve the DoB - Year validation** |
| **QP-7751** | **Amount of services in parked visit (user-/servicepointpool)** |
| **QP-8579** | **Add a setting which will change the behaviour of getting the workstations for all branches** |
| **QP-10535** | **Simplified transfer to queue option with less number of clicks** |
| **QP-10483** | **Counter module not saving cookie with counter settings selection** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-10248** | **Teams meeting button disappears after confirm is clicked** |
| **QP-10237** | **Counter > Add an option to change the order of the dob input of customer from** |
| **QP-10265** | **SLA icon shows when there are zero customers in the queue** |
| **QP-10615** | **One Click Transfer > Tool Tip is not visible until user add a delivered service to the visit.** |

**Note:** Added a new configuration in **QP-10265** (One click transfer). To enable this feature, 'Queue transfer controls' and 'Transfer Button' should be enabled along with 'One click transfer' at branch level. The 'One click transfer' button will be visible in both 'My queues' and 'All queues' when all non-appointment visits are called.

----------

<h2>Version 4.0.0.045</h2>

**Date: 17/05/2021**

**Build number: 045**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9667** | **Finding the checkbox for the notification is too complicated** | 
| **QP-9949** | **Primary and Secondary Resource shown in "call" card** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9776** | **Counter not always show Primary/Secondary Resources** |

----------

<h2>Version 4.0.0.044</h2>

**Date: 25/03/2021**

**Build number: 044**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9598** | **Unique url path name for Counter** | 
| **QP-9177** | **Phone validation differs between Counter and other applications** |

<h3>Upgrade Instructions</h3>
- Should update the application related data since change the application name

1. Add/update a record in application and application_modules table
INSERT INTO qp_central.applications
(id,branch_app,is_distributed,enabled,icon_url,url,version,view_index)
VALUES('counter',true,true,1,NULL,'counter',1,10)

INSERT INTO qp_central.application_modules     
     (id,is_distributed,enabled,icon_url,privilege_level,url,view_index,application_id)
     VALUES ('counter',0,1,NULL,20,NULL,0,'counter')

2. Add new section to commonMessages.properties 
application.counter                  = Counter
application.counter.description      = Counter Workstation
module.counter                       = Counter

3. Add Counter module to CounterUser role

4. Restart the Orchestra

----------

<h2>Version 4.0.0.043</h2>

**Date: 18/02/2021**

**Build number: 043**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9353** | **Show version in the status bar** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9437** | **Malformed unit parameter in UTT issue fixed** |

----------

<h2>Version 4.0.0.042</h2>

**Date: 29/01/2021**

**Build number: 042**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8903** | **Showing Primary and Secondary Resources in Queue** |
| **QP-8999** | **Counter module - Force logout bug Orchestra 7.0 and 7.1** |
| **QP-8581** | **Add walk delay time time for transfers** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-9001** | **Minneapolis - Counter Module, Add Service not Alphabetized** |

----------

<h2>Version 4.0.0.041</h2>

**Date: 18/12/2020**

**Build number: 041**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8582** | **Show custom fields in the visit called card** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8810** | **Counter - Note doesn't show in the queue list if the note has a percentage mark** |

----------

<h2>Version 4.0.0.040</h2>

**Date: 11/09/2020**

**Build number: 040**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8335** | **Edited customer details (from MT) doesn't retain from Counter** |
| **QP-6761** | **Workstation terminal Time in pool is not updated automatically** |
| **QP-8411** | **Cannot add a new customer when user use form auto-filling option** |
| **QP-8408** | **"Start Meeting" button doesn't hide when the MS TEAMS utt disabled/removed from the branch** |


----------

<h2>Version 4.0.0.039</h2>

**Date: 28/08/2020**

**Build number: 039**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8364** | **'Session about to expire' message should be less technical** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8399** | **Cannot update the customer information** |


----------


<h2>Version 4.0.0.038</h2>

**Date: 17/08/2020**

**Build number: 038**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-8313** | **Add new button for opening meeting when present on the visit** |
| **QP-8128** | **Counter: extending session for WCAG compliance** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-7747** | **Admin changed workprofile isn't shown in counter** |


----------


<h2>Version 4.0.0.037</h2>

**Date: 01/07/2020**

**Build number: 037**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-7918** | **Cannot click to send SMS on a called visit** |

----------

<h2>Version 4.0.0.036</h2>

**Date: 25/06/2020**

**Build number: 036**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **QP-7744** | **Address CSRF issues raised by OBM in a security audit report** |

----------

<h2>Version 4.0.0.035</h2>

**Date: 24/04/2020**

**Build number: 035**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-222** | **Store Mobile number on visit when using "SMS Ticket" in extended queue view** |

----------

<h2>Version 4.0.0.034</h2>

**Date: 15/04/2020**

**Build number: 034**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-210** | **Queue list in Counter shows icons if notes exists on visit** |

----------

<h2>Version 4.0.0.033</h2>

**Date: 27/03/2020**

**Build number: 033**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-201** | **Send SMS notification** |
| **COUNTER-184** | **Desktop notification when customer waiting in queue (GAP Spain)** |

----------

<h2>Version 4.0.0.032</h2>

**Date: 28/02/2020**

**Build number: 032**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **171250252** | **Update customer details of an unknown customer** |
| **169089830** | **General Counter- new to save newline characters to Counter notes field.** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **170643047** | **Update customer information is not able to save in the workstation** |
| **170049536** | **Ticket list in queue cannot be sorted, neither ascending nor descending works** |

----------

<h2>Version 4.0.0.031</h2>

**Date: 05/11/2019**

**Build number: 031**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **165239364** | **Transaction / Service Time** |
| **164825164** | **Presentation of visits (tickets) by work profile (GAP Spain)** |
| **164861500** | **Present additional information per visit in user pool/counter pool (GAP BNLX))** |
| **168215794** | **Arrow key navigation in lists** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **169444525** | **Counter UI > User cannot see visits at the bottom of the visit list.** |

----------

<h2>Version 4.0.0.029</h2>

**Date: 30/08/2019**

**Build number: 029**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **167084467** | **Indicate charachter limit to user** |
| **000000000** | **Added WCAG support** |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **167338530** | **GUI issue in create customer form** |
| **167338834** | **Create customer form validation issues** |
| **167776865** | **Visit card > After add a service to the visit, user will see the visit card behind the add service window.** |
| **167776866** | **When there is no Mark type is set from UTT, not to show 'Add a mark' link in the visit card.** |
| **167993307** | **Walk in customer > service search is not working.** |
| **168070913** | **Serve Page / Note field character limit exceed message** |
| **167421044** | **date of birth" field label text is not reading from screen reader (NVDA)** |
| **167452543** | **WCAG - Add customer > mandatory fields are getting red once user tab on it.** |
| **167479893** | **Add Marks > validation issues in no of marks field** |

----------

<h2>Version 4.0.0.027</h2>

**Date: 05/06/2019**

**Build number: 027**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **166081841** | **WCAG - CP10 - Contrast between foreground and background** Change colors, added validation messages to customer forms |
| **166026887** | **WCAG - Tabbing NL20/NL30** Improve tabbing, change focus to popovers on initialization and destruction, change styling to indicate focus on custom tabable elements, group links in header |
| **166080611** | **WCAG - Bypass Blocks - NL50** Add anchor link shortcuts to card and action panel |
| **166030010** | **WCAG - SW60 - Move Focus ** Move focus to card top when pressing WALK-IN, Add service to visit, Add marks, Call next, Add Ds/Outcome |

----------

<h2>Version 4.0.0.022</h2>

**Date: 15/04/2019**

**Build number: 022**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **164824646** | **Call any service in a multi service visit** Add serve buttons to multi services in visit card |
| **COUNTER-126** | **Setting to set several Mark Types for a counter and show the marks grouped in the Counter** Add dropdown to select mark type before selecting mark |
| **COUNTER-127** | **Remove users active session (GAP BNLX/UK)** Add option to force logout |
| **COUNTER-129** | **Transfer with delay for visit/multi-service visit (GAP BNLX)** Add option to transfer with delay from queue |
| **166081841** | **WCAG - CP10 - Contrast between foreground and background** Change colors, added validation messages to customer forms |
| **166026887** | **WCAG - Tabbing NL20/NL30** Improve tabbing, change focus to popovers on initialization and destruction, change styling to indicate focus on custom tabable elements, group links in header |
| **166080611** | **WCAG - Bypass Blocks - NL50** Add anchor link shortcuts to card and action panel |
| **166030010** | **WCAG - SW60 - Move Focus ** Move focus to card top when pressing WALK-IN, Add service to visit, Add marks, Call next, Add Ds/Outcome |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-134** | **Cannot call next visit** Removed loop checking visit state during visit in display queue, added checks for empty responses in queues and pools |
| **COUNTER-137** | **custom_1 field includes too many characters and makes statistics end up in failed events** Removed encoding when saving notes |
| **COUNTER-138** | **LED does not show called ticket after StoreNext call from WebServicepoint** UTT adjustments to REMOVE_USER_FROM_STORE_NEXT |
| **COUNTER-140** | **Hard to see Mark Types options on small screens** Adjustment of dropdown heights for marks dropdowns |
| **COUNTER-143** | **Need to click TWICE after search** Fixed event listener for custom search |
| **COUNTER-145** | **workstationTerminalMessages.properties > spelling mistakes in English phases** Corrected spelling |

----------

<h2>Version 4.0.0.021</h2>

**Date: 18/03/2019**

**Build number: 021**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **164398417** | **counter story** Add cancel button to multi service modal |
| **163318753** | **Use system parameter for date** Use system parameter when displaying date |
| **160344676** | **Update description for the Multisession counter utt** UTT changes, updated description of WebCounterMultiStaff |

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-122** | **Possible to press counter before a branch is selected** Removed outline for custom select |
| **COUNTER-125** | **Expressia can still be used after the customer is transferred** UTT Changes to Expressia and Expressia_D924 |

----------

<h2>Version 4.0.0.020</h2>

**Date: 11/01/2019**

**Build number: 020**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-119** | **Filter text - transfer options** Color change on input fields and added clear button to search fields in transfer searches and walk in card. |
| **COUNTER-120** | **Servicepoint LED does not switch to "open" message when ending visit after adding service** Changes to UTT for unitEvent END_SERVICE. |

----------

<h2>Version 4.0.0.019</h2>

**Date: 20/12/2018**

**Build number: 019**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **COUNTER-116** | **Undefined Undefined selected when user click "No Customer found text"** Not setting click listener when result array is empty. |
| **COUNTER-117** | **Update readme instruction on github** Added fallback proxy url to orchestra and assuming it is running on localhost port 8080, updated readme with changed filename of gulp config. |

----------

<h2>Version 4.0.0.018</h2>

**Date: 22/10/2018**

**Build number: 018**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **161107886** | **AM/PM & 24 Hour format** Now using orchestra setting for am/pm to determine how to display appointment times in queue and on visit card |

----------

<h2>Version 4.0.0.017</h2>

**Date: 12/10/2018**

**Build number: 017**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **161047690** | **Make workstationterminal.war compatible between current Orchestra 7.0 (4.0.0.418) and future 7.1** Update web.xml |

----------

<h2>Version 4.0.0.016</h2>

**Date: 14/09/2018**

**Build number: 016**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **160168779** | **Show Appointment Time in the visit card** Show appointment time in visit card |
| **159847899** | **User-/servicepointpool name not visible** Added title on hover |
| **158180727** | **Update regex for phone number when creating /edit customer** Updated validation of phone number |
| **160168889** | **Show Serving Time info next to Transaction Time** Show expected Serving Time info next to Transaction Time |
| **155973320** | **Date of birth add to Customer object** Add date of birth to create and edit customer and print date of birth in additional customer list |

----------

<h2>Version 4.0.0.015</h2>

**Date: 31/08/2018**

**Build number: 015**

<h3>Stories</h3>

| **Id** | **Release notes** |
| --- | --- |
| **160163513** | **Update icons for Counter** Update icons for Counter and UTTs |

----------

<h2>Version 4.0.0.014</h2>

**Date: 27/06/2018**

**Build number: 014**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **158627159** | **Search customer with phone number with + does not return any response** |

----------

<h2>Version 4.0.0.013</h2>

**Date: 26/02/2018**

**Build number: 013**

<h3>Bug fixes</h3>

| **Id** | **Release notes** |
| --- | --- |
| **157141258** | **Transferring visits does not update the order in the queue GUI** |

----------

<h2>Original release</h2>

**Date: 10/01/2018**

**Build number: 001**

----------

<h3>Copyright notice</h3>

The information in this document is subject to change without prior notice and does not represent a commitment on the part of Q-MATIC AB. All efforts have been made to ensure the accuracy of this manual, but Q-MATIC AB cannot assume any responsibility for any errors and their consequences.

This manual is copyrighted and all rights are reserved.
Qmatic and Qmatic Orchestra are registered trademarks or trademarks of Q-MATIC AB.
Reproduction of any part of this manual, in any form, is not allowed, unless written permission is given by Q-MATIC AB.
COPYRIGHT (c) Q-MATIC AB, 2018.

