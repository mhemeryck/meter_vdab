swapValues = ['Zoek site', 'Zoek vacatures', 'Zoek opleidingen'];
	
	 $(document).ready(function(){  
	  
		$("img#searchMenuTrigger").click(function() { //When trigger is clicked...  
	  
		   $("ul.searchMenu").show();
		
		   $("ul.searchMenu").hover(function() {  
		   }, function(){  
			   $("ul.searchMenu").hide(); //When the mouse hovers out of the subnav, move it back up  
		   });  
	   });  
	 
   });

	jQuery(function() {
		
		jQuery(".swap_value").each(function(i){
			swapValues[i] = jQuery(this).val();
			jQuery(this).focus(function(){
				if (jQuery(this).val() == swapValues[jQuery("#searchType").val()]) {
					jQuery(this).val("");
				}
			}).blur(function(){
				if (jQuery.trim(jQuery(this).val()) == "") {
					jQuery(this).val(swapValues[jQuery("#searchType").val()]);
				}
			});
		});

	});
	
function setSearch(typeId) {
		$("input#searchType").val(typeId);
		$("input#searchField").val(swapValues[typeId]);
		$("ul.searchMenu").hide();
}
