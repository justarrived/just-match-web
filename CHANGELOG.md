# JustMatch API - Change Log

HEAD
-----------


v1.15 - 2018-02-09
-----------
* Update default Open Graph image
* Add more featured jobs to start page
* Update job date handling
* Revert "Add Heap Analytics"
* Replace contact/support form with support email


v1.14 - 2018-01-09
-----------
* Add Schema.org JobPosting JSON-ld data to job show page
* Pull translations


v1.13 - 2017-12-13
-----------
* Remove partners-section from home page
* Add `/utalk` page
* Show uTalk section even if user is not logged in


v1.12 - 2017-12-07
-----------
* Update number of jobs listed on the jobs index page 12 => 20


v1.11 - 2017-12-07
-----------
* Replace FAQ link with job guide link in main nav
* Add guide start page image & increase intro text font size
* Pull translations from Transifex
* Update global link styling (from light grey to our clear-blue)
* Also fix max img width for markdown wrapped in basic-text component.
* Force guide articles to have max 100% width.
* Update guide welcome title
* Remove log statement
* Use JA terms when staffingJob = true.
* Display the personal letter input.
* Added a personal letter input component
* Add document input hint
* Remove the angularitics attributes on buttons and links since they are supported via directives.
* Switched type of publishEvent to use the enum type
* Add language parameter to all events
* Pass parameters to all events
* Revert "Remove apply for job event args"
* Remove apply for job event args
* Add another UserUpdate publishment
* Added several analytics event publishments
* Added some login event publishments
* Publish register events
* Added analytics service and some published events for applying for job.
* Added angularities support to buttons and links


v1.10 - 2017-11-24
-----------
* Move up task and requirements description section on the job show page
* Revert "On staging and production servers share the cookie between subdomains"
* Show active subscriptions above the new subscription form
* Use occupations support
* Added occupations to /update-profile
* Bugfixes for occupation input
* Update i18n copy.
* Added occupations input support to missing user traits supporting components
* Added occupations years of experience component
* Added number input and based the years of experience input on that.
* Added user occupations model and proxy
* Place resume on top in update form
* Change e2e tsconfig
* Fixed transfer-state bug
* Angular 5 :tada:
* Update `package.json` scripts
* Update rxjs imports
* Bump typescript


v1.9 - 2017-11-15
-----------
* Upgrade to Angular 5
* Optimize bundle size
* Remove vendor bundle with --build-optimizer
* Remove Gulp dependencies
* Use Angular-cli for Universal
* Remove unused dependencies
* Move all dependencies that is needed to build to non dev dependencies
* Move all dependencies that is needed to test to dev dependencies


v1.8 - 2017-11-10
-----------
* Replace navigation and language menu background image with color
* Replace footer background image with color


v1.7 - 2017-11-09
-----------
* Don't display jobs that are filled in `new-jobs-section.component`
* Pull sv locale from Transifex


v1.6 - 2017-11-09
-----------
* Pull translations from Transifex
* Add missing ?. in guide-section-article.component template call chain
* :hocho: typo in en translation
* Pull arabic locale translations from Transifex
* Display the section title in the article card rather than the article title twice
* Removed the autosize directive. Caused a major bug that would not allow users to scroll when textareas became large. Will have to do it in some other way.
* Bugfix: the result control value used for catching multiple select inputs is replaced by angular on form submits sometimes. Solved it by using a result array instead. Ugly but works…
* Added result control to user details form for user notifications input
* Don’t use transparent navbar when top scrolled if cookie bar or god mode bar is visible
* Also added the email suggestion functionality to email or phone input
* Implemented on the fly email suggestions when typing emails.
* Added email suggestion model and proxy
* Fix button active styles
* Pull translations
* Also added the redirect functionality to logged in admin guard.
* If blocked by logged in guard the user is redirected to login and after login success redirected to initial page
* Fix bug that caused user notifications dropdown to drop results after submit.
* Update user notification proxy API URL
* Solve the multiple select issues utilizing another control to hold the result
* Remove salary information from job show page
* Remove total job salary from job show page
* Update circle.yml config to use node v6.11.3 (was 6.10.2)
* Pull sv translations from Transifex
* Add RendererFactory2 to BasicUserDataPage component
* Reset dev env API URL
* Add /user-notification-settings-page
* Update ignore notifications input component
* Step towards multiselect support in select-input.component.ts
* Add support for multiple dropdown in select-input.component
* [draft] Ignore user notification input


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
