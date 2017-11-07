# JustMatch API - Change Log

HEAD
-----------


v1.5 - 2017-11-07
-----------
* Remove salary information from job show page
* Update `circle.yml` config to use node v6.11.3 (was 6.10.2)
* Pull sv translations from Transifex
* Add `RendererFactory2` to `BasicUserDataPage` component
* Reset dev env API URL


v1.4 - 2017-11-03
-----------
__Feature__:
* Guide module


v1.3 - 2017-11-01
-----------
* Add missing I18n to basic-user-data.component
* Update /basic-user-data => /update-profile
* On staging and production servers share the cookie between subdomains
* Replace justarrived.se link with app.justarrived.se link on job show page
* Reset basic-user-data-page tab contents
* Add basic-user-data-page.component
* Add missing translation to job-digest-from.component
* Pull translations from Transifex
* Update english translations for job subscriptions
* Add new job subscription button to the bottom of the jobs listing page
* Update job subscriptions page to only display relevant sections
* Add /subscriptions to main navigation
* Add meta-tag theme-color to index.html & offline.html
* Include filled and open_for_applications in jobs request
* Sort by featured in new-jobs-section.component
* Only include the required fields from the API in jobs-pager-section.component
* Rename function in filter-jobs-inputs.component
* Extract jobs-filter options data to its own function
* Remove job_date filter from unfilled jobs
* Add cancelled filter to jobs-filter component
* Update default jobs-filter component value
* Add UTM-params to default-footer component


v1.2 - 2017-09-15
-----------
* Autocomplete address input component
* Autocomplete address city component
* Custom checkbox input
* Job digest notification frequency input
* Primary occupations input
* Subscriptions page
* /subscriptions and /subscriptions/:subscriberUuid routes added
* Job digest form and pager
* Possible to subscribe to job digest either logged-in or not logged-in

v1.1 - 2017-07-13
-----------
* Upgrade node from 6.9.1 => 6.11.1
  - Fixes this vuln: https://events.ccc.de/congress/2011/Fahrplan/attachments/2007_28C3_Effective_DoS_on_web_application_platforms.pdf


v1.0 - 2017-07-11
-----------
* _Bugfix_:
  - Fix job preview key implementation


hint `git log` is your friend
