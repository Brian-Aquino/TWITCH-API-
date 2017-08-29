
 var follower = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  //An array of users or in this case, streamers that will be placed on the document.
  $.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/freecodecamp', 
    headers: {
      'client-ID': 'ziu3fledjh14rd812socrwluiz1o31'
    },
    // Twitch requires a client id to request their data now. You can bypass this by using the https://wind-bow.glitch.me/twitch-api/streams/ESL_SC2?callback=? url to request certain objects. However, some objects won't be available if you do choose to bypass registering for a client_id.
    success: function(data) {
      
      if (data.stream === null) {
        $('#fcc').html(' FreeCodeCamp is Offline');//.html will completely replace the contents of the tag, whereas append will add onto the end of the tag.
      } else {
        $('#fcc').html('<span class="online"> FreeCodeCamp is Online!</span>');
      }
    }, 
    error: function(err) {
      alert("Error");
    }
  });

  for (var i = 0; i < follower.length; i++) {
//The for loop iterates through each follower of the url so that the objects for each user is requested for the channel, status, and game being played
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + follower[i], 
      headers: {
        'client-ID': '59x9ex7f5zzongzntqx0zrwleoxy12'
      },
      //use getJSON to see difference in declaring
      //You could also use $.getJSON and use the client_Id as a token to request Twitch's objects.
      success: function(dataI) {
        var name = dataI._links.self.slice(37)
        getLogo(name);
        //This slices through the url of the object so that the only thing that remains is the name of the user of the channel
       
        
        // console.log(follower);
        // if (dataI.stream === null) {
        //   $('#status').append(' is Offline<br>')
        //   $('#channel').append('<a target="blank" href="https://www.twitch.tv/' + name + '">' + name + '</a><br>')
        //   $('#game').append('N/A<br>');
        // } else {
        //   $('#status').append(' is Online<br>')
        //   $('#channel').append('<a target="blank" href="https://www.twitch.tv/' + name + '">' + name + '</a><br>')
        //   $('#game').append(dataI.stream.game + '<br>');
        // }
      
        if(dataI.stream === null){
       //table data contains objects
          //Line 54 is used as a reference for what's outside of the scope of this local scope
          $('#myTable').append('<tr class="'+name.toLowerCase()+'">'+
            '<td><a target="blank" href="https://www.twitch.tv/'+name + '">' + name +
            '<td>Offline</td>'+
             '</a></td>'+
            '<td>N/A</td>')
        
      } 
         else{
           $('#myTable').append('<tr class="'+name.toLowerCase()+'">'+
            '<td><a target="blank" href="https://www.twitch.tv/'+name + '">' + name +
            '<td><span class= "online">Online</span></td>'+
             '</a></td>'+
            '<td><span class="online">'+( dataI.stream.game ||'N/A')+'</span></td>');
      }
// You can change the color of an event by adding a span tag to the condition
// Unexpected string when I try to pull out the property value from Twitch JSON
     },
      error: function(err) {
        alert("Some users are no longer available");
      }
   }
          );
  }
   //Difference request for objects using a different url-- makes it easier to seek out specific properties and their corresponding values 
   
 // The function below calls on the previous name in the second ajax function to find the logo for each channel 
  function getLogo(name){
     $.ajax({
      type:'GET',
      url:'https://api.twitch.tv/kraken/channels/'+ name,
      headers:{
      'client-ID': '59x9ex7f5zzongzntqx0zrwleoxy12'
      },
      success: function(d2){
       var logo = d2.logo || 'http://jesusldn.com/wp-content/uploads/2015/06/noimage.png';
           $('#myTable tr[class='+d2.name+']').append('<td><img src="'+logo+'" height="50" ></td>')
      // I will append the image from Twitch's JSON and if not, I will set a default image for channels that exist but don't have a logo
      
      }
        
      }
    )
            }
    
  
  
  

   
   //Logo doesn't function properly due to the rows of the objects being in the same row.
   
   
   
   
//  }
  
  







function myFunction() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();       // table setup for on-key search
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}