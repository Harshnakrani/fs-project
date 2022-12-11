/*!
* Start Bootstrap - Modern Business v5.0.6 (https://startbootstrap.com/template-overviews/modern-business)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-modern-business/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

$(function () {
  $("#datepicker").datepicker({ minDate: 0 });

  $('#dt_table').DataTable({
    info: false,
    'columnDefs': [ {
      'targets': [1,3,4], 
      'orderable': false, 
   }],
   
  });


});