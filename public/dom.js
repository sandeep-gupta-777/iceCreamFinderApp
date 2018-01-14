/*This module is for extensive DOM manipulations*/

const DomModule = (function () {

    //DOM cache
    let $spinner = document.getElementById('spinner');

    //Module functions
    let startSpinner = function () {
      $spinner.classList.add('fa-spinner');
    };
    let stopSpinner = function () {
        $spinner.classList.remove('fa-spinner');
    };
    let toggleSpinner = function () {
        $spinner.classList.toggle('fa-spinner');
    };
    return{
        toggleSpinner,
        startSpinner,
        stopSpinner
    }

})();