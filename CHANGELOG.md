# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased

## [0.0.1] - 2018-03-06
### Added
 - Basic routing
   - user gets redirected to `#/ ` when enters the SPA with no hash
   - user gets redirected to `#/login` when not authorized
 - Page stubs
   - Login page
   - Register page
   - Order page (fake, to test order id parameter parsing)
   - 404 page
 - Other
   - user input validation as per
     [Kottans pizza API specs](https://github.com/lempiy/Kottans-Pizza-Api/blob/master/docs/USERS.md)
     on Login and Register pages
