(function ($, Drupal, drupalSettings) {

  "use strict";

  // Sep up the namespace as a function to store list of arguments in a queue.
  Drupal.eu_cookie_compliance = Drupal.eu_cookie_compliance || function() {
    (Drupal.eu_cookie_compliance.queue = Drupal.eu_cookie_compliance.queue || []).push(arguments)
  };

  // Initialize the object with some data.
  Drupal.eu_cookie_compliance.a = +new Date;

  // A shorter name to use when accessing the namespace.
  var self = Drupal.eu_cookie_compliance;

  // Temporaneamente stacco questa cosa che serve solo nel backend
  // per rendere più carino il json, visto che usa jquery si rompe
  // ed inoltre nel frontend non serve. Bisognerebbe fare un refactoring
  // completo di tutto il codice.
  // Drupal.behaviors.euCookieComplianceGTM = {
  //   attach: function (context) {

  //     var prettyPrint = function(e) {
  //       var textarea = e.currentTarget;
  //       var ugly = $(textarea).val();
  //       try {
  //         var obj = JSON.parse(ugly);
  //         var pretty = JSON.stringify(obj, undefined, 4);
  //         $(textarea).val(pretty);
  //       } catch (e) {
  //         // Oh well, but whatever...
  //       }
  //     }

  //     $('textarea.eu_cookie_compliance_gtm_pretty_json').once('eu_cookie_compliance_gtm_pretty_json_processed').each(function () {
  //       $(this).on('blur', prettyPrint);
  //     });
  //   }
  // };

  /**
   * Replaces tokens in the GTM values.
   * @private
   */
  var _replaceTokens = function(response, value, replacements) {

    var details = drupalSettings.eu_cookie_compliance.cookie_categories_details;
    replacements = replacements || {};

    // Build replacements for all categories' status.
    for (let category in details) {
      let key = '@' + category + '_status';
      replacements[key] = response.currentCategories.includes(category) ? "1" : "0";
    }

    // Pocess the replacements.
    for (let key in replacements) {
      value = value.replace(new RegExp(key, 'g'), replacements[key]);
    }

    // Return the result.
    return value;
  }

  /**
   * Prepares data to be sent to GTM.
   * @private
   */
  var _processProps = function(response, data) {

    var details = drupalSettings.eu_cookie_compliance.cookie_categories_details;

    for (let category in details) {
      if ('third_party_settings' in details[category]) {
        for (let prop in details[category].third_party_settings.eu_cookie_compliance_gtm.gtm_data) {
          let value = '' + details[category].third_party_settings.eu_cookie_compliance_gtm.gtm_data[prop];
          let status = response.currentCategories.includes(category) ? "granted" : "denied";
          data[prop] = _replaceTokens(response, value, {'@status': status});
        }
      }
    }

    return data;
  }

  var postPreferencesLoadHandler = function(response) {
    window.dataLayer = window.dataLayer || [];

    function gtag() {window.dataLayer.push(arguments);}

    var data = {};
    data = _processProps(response, data);

    gtag('consent', 'default', data);
  };
  Drupal.eu_cookie_compliance('postPreferencesLoad', postPreferencesLoadHandler);

  var postPreferencesSaveHandler = function(response) {
    window.dataLayer = window.dataLayer || [];

    function gtag() {window.dataLayer.push(arguments);}

    var data = {};
    data = _processProps(response, data);

    gtag('consent', 'update', data);
  };
  Drupal.eu_cookie_compliance('postPreferencesSave', postPreferencesSaveHandler);

})(jQuery, Drupal, drupalSettings);
