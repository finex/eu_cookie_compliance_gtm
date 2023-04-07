# EU Cookie Compliance GTM - Drupal 10 + Consent mode

This is a fork of the [EU Cookie Compliance GTM Drupal](https://www.drupal.org/project/eu_cookie_compliance_gtm) module with Drupal 10 support and consent mode from [This patch](https://www.drupal.org/project/eu_cookie_compliance_gtm/issues/3332626).

This project will be deleted when the contrib module will be uffically updated and patched.
# Original description
This is a complementary module for the [EU Cookie Compliance (GDPR Compliance)](https://www.drupal.org/project/eu_cookie_compliance) module, which integrates it with [GoogleTagManager](https://www.drupal.org/project/google_tag) module.
Firstly, it extends the cookie category admin UI by adding a field to store arbitrary data in JSON format for each category.
Secondly, it exposes that data in drupalSettings.
Finally, it pushes that data to dataLayer by hooking into events triggered by the main module on user interaction.


## Requirements

- [eu_cookie_compliance](https://www.drupal.org/project/eu_cookie_compliance)
- [google_tag](https://www.drupal.org/project/google_tag)


## Installation

Install as you would normally install a contributed Drupal module. See the official [documentation](https://www.drupal.org/documentation/install/modules-themes/modules-8) for further information.
Enable the module through the Drupal administration interface or via Drush (`drush en -y eu_cookie_compliance_gtm`).


## Configuration

You can configure the data to be sent to GTM on the edit form of each cookie category from `/admin/config/system/eu-cookie-compliance/categories`.


## Support & Maintenance

For any issues or feature requests, please use the [issue tracker](https://www.drupal.org/project/issues/eu_cookie_compliance_gtm) of the project.