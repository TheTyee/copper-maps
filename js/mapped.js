
var map, 
    selected_chapter,
    paragraph_to_show,
    paragraph_to_hide,
    ch1url = "http://thetyee.ca/News/2014/03/24/Copper-Mountain-Resurrected/?utm_campaign=map",
    ch2url = "http://thetyee.ca/News/2014/03/25/Copper-Casino-Bet/?utm_campaign=map",
    ch3url = "http://thetyee.ca/News/2014/03/26/Copper-Meets-Fire/?utm_campaign=map",
    ch4url = "http://thetyee.ca/News/2014/03/27/BC-Copper-Asian-Cell-Phones/?utm_campaign=map",
    ch5url = "http://thetyee.ca/News/2014/03/27/Peak-Copper/?utm_campaign=map",
    ch6url = "http://thetyee.ca/News/2014/03/28/Copper-Disconnect/?utm_campaign=map";




var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 4
  };


function letsBounce(marker){
    
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    }
    else {

      marker.setAnimation(google.maps.Animation.BOUNCE);
      var t = setTimeout(function() {
        letsBounce(marker)},10);
    }
}

function markerHighlight(marker){
  var theZoom = map.getZoom();
    if (theZoom < 5) {
            map.setZoom(5);

    }
      map.setCenter(marker.getPosition());
      letsBounce(marker);
      showInfo(marker);
}

function drawTheLines(color, startPin, endPin) {
  var line = new google.maps.Polyline({
    path: [
    new google.maps.LatLng(startPin.latitude, startPin.longitude),
    new google.maps.LatLng(endPin.latitude, endPin.longitude)
  ],
    geodesic: true,
    strokeColor: color,
    strokeOpacity: 0,
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }]
  });
 
  line.setMap(map);
}

function add_markers_for_map(story) {
  load_markers(story.map, story.pin_color);
}



function chapter_select(elem) {
  var el = $(elem);
  if (selected_chapter != elem) {
  paragraph_to_show = el.find('p');
  paragraph_to_hide = $(selected_chapter).find('p');
  paragraph_to_hide.slideUp();
  paragraph_to_show.slideDown();
  selected_chapter = elem;
  }
  else {
    el.find('p').slideUp();
    selected_chapter = null;
  }



}

function add_markers(array) {
  for (index = 0; index < array.length; ++index) {
    marker = array[index];
    marker.setMap(map);
  } 
}

function remove_markers(array) {
  for (index = 0; index < array.length; ++index) {
    marker = array[index];
    marker.setMap(null);
  }
}
function make_marker(location, image, array) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(location.latitude,location.longitude),
    flat: true,
    chapter: location.map_id,
    icon: image,
    title:location.title,
    read_more: location.read_more,
    img: location.image,
    description: location.description,
    collection: array,
    boss: location
});
  array.push(marker);
  marker.setAnimation(null);

  var infowindow = new google.maps.InfoWindow({
      content: marker.title,
      position: marker.position
  });
  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map,marker);
  });

  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close(map,marker);
  });



  google.maps.event.addListener(marker, 'click', function() {
    var theZoom = map.getZoom();
    if (theZoom < 5) {
            map.setZoom(5);

    }
      map.setCenter(marker.getPosition());
      letsBounce(marker);
      showInfo(marker);
      openRelatedChapter(marker.chapter);

  });

function openRelatedChapter(chapter) {
  switch(chapter)
  {
    case 1: 
      openChapterWindow("#chapter-one");
      break;
    case 2:
      openChapterWindow("#chapter-two");
      break;
    case 3:
      openChapterWindow("#chapter-three");
      break;
    case 4:
      openChapterWindow("#chapter-four");
      break;
    case 5:
      openChapterWindow('#chapter-five');
      break;
    case 6:
      openChapterWindow("#chapter-six");
      break;
        }
}

function openChapterWindow(elem){
var el = $(elem);
  if (selected_chapter != elem) {
  paragraph_to_show = el.find('p');
  paragraph_to_hide = $(selected_chapter).find('p');
  paragraph_to_hide.slideUp();
  paragraph_to_show.slideDown();
  selected_chapter = elem;
  }
  

}
}

function toggleMarkers(lat, lon, array, zoom){
  
      var position = new google.maps.LatLng(lat, lon);
      map.panTo(position);
      if (array != null) {
              make_a_list(array);
      }
      map.setZoom(zoom);
  
  }

var stylesArray = [
  {
    "stylers": [
      { "visibility": "simplified" }
    ]
  },{
    "elementType": "labels",
    "stylers": [
      { "visibility": "on" }
    ]
  },{
    "featureType": "landscape.natural.terrain",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.natural.terrain",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      { "visibility": "off" }
    ]
  },{
    "featureType": "water",
    "stylers": [
      { "lightness": -12 },
      { "gamma": 0.86 },
      { "saturation": -46 },
      { "hue": "#0077ff" }
    ]
  },{
    "featureType": "administrative",
    "stylers": [
      { "lightness": 39 },
      { "saturation": -43 },
      { "hue": "#00ffee" },
      { "gamma": 0.62 },
      { "visibility": "on" }
    ]
  },{
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [
      { "hue": "#08ff00" },
      { "visibility": "off" }
    ]
  },{
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      { "hue": "#b2ff00" },
      { "visibility": "simplified" },
      { "saturation": -31 }
    ]
  },{
  }
];

var mapOptions = {
          center: new google.maps.LatLng(46.054262, 180.5468754),
          zoom: 3,
          styles: stylesArray,
          disableDefaultUI: true,
          mapTypeControl: false,
    
    	panControl: false,
    	panControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.LARGE,
        position: google.maps.ControlPosition.LEFT_CENTER
    },
    scaleControl: false,
    streetViewControl: false
    

        };

var map = new google.maps.Map(document.getElementById("map-canvas"),
            mapOptions);

var copper_mountain = {
    "map_id":1,
    "title":"Copper Mountain mine",
    "latitude":49.280146,
    "longitude":239.501338,
    "image":"img/machines.jpg",
    "read_more":ch1url,
   "description":'"Dust and smoke rise, as explosives shatter seams of rock into moveable chunks 350 metres below me. Bungalow-sized Komatsu trucks (the tires alone cost $40,000 each) wind downward around the terraced edges of the pit toward North America\'s biggest hydraulic shovel..."'
};
var mining_district = 
      {
    "map_id":2,
    "title":"Vancouver mining district",
    "latitude":49.283756,
    "longitude":236.885969,
    "image":"img/Googlestreet.jpg",
    "read_more":ch2url,
    "description":"The Copper Road’s next stop runs through Vancouver, whose financial specialists are global leaders at raising venture capital to develop mineral claims into working mines. (Image: Google Earth streetview)"
  };
  var schaft_creek = {
    "map_id":2,
    "title":"Schaft Creek",
    "latitude":57.535844,
    "longitude":229.338881,
    "image":"",
    "read_more":"http://thetyee.ca/News/2011/05/23/MiningMess/",
    "description":""
  };

var galore_creek = 
  {
    "map_id":2,
    "title":"Galore Creek",
    "latitude":57.073119,
    "longitude":228.814564,
    "image":"",
    "read_more":"http://thetyee.ca/News/2011/05/23/MiningMess/",
    "description":""
  };
var kerr_sulphrets_mitchell = 
  {
    "map_id":2,
    "title":"Kerr-Sulphrets-Mitchell",
    "latitude":56.682536,
    "longitude":229.551578,
    "image":"",
    "read_more":"http://thetyee.ca/News/2011/05/23/MiningMess/",
    "description":""
  };

var naoshima_island = {
    "map_id":3,
    "title":"Naoshima Island",
    "latitude":34.472653,
    "longitude":133.970267,
    "image":"img/NaoshimaSmelter.jpg",
    "read_more":ch3url,
    "description":"In a surreal twist that is uniquely Japanese, Naoshima is not only a smelter but also a world famous fine art gallery 'park,' covering most of the island's 17 square kilometres."

  };
  var hishikari_mine = {
    "map_id":3,
    "title":"Hishikari Mine",
    "latitude":31.786419,
    "longitude":130.665814,
    "image":"",
    "read_more":ch3url,
    "description":"After China, Japan smelts more copper than anywhere else on the planet (about 10 per cent of the global total). How has a country with only one commercially active mine left (Hishikari, featured here) become one of the world's most important centres for smelting and refining the pure metal out of copper ore from mines around the globe?"
  };
  
  var osaka = {
    "map_id":3,
    "title":"Osaka",
    "latitude":34.699669,
    "longitude":135.508839,
    "image":"img/bullet.jpg",
    "read_more":ch3url,
    "description":"Landing in Osaka, Pollon took a bullet train and private ferry to Naoshima Island, where the raw concentrate from Copper Mountain is refined into pure copper."
  };
  var toyko = {
    "map_id":3,
    "title":"Tokyo",
    "latitude":35.687278,
    "longitude":139.703422,
    "image":"",
    "read_more":"",
    "description":""
  };
  var kunshan_china = {
    "map_id":4,
    "title":"Kunshan, China",
    "latitude":31.373875,
    "longitude":120.984244,
    "image":"img/Kunshan.jpg",
    "read_more":ch4url,
    "description":"Kunshan, just outside of Shanghai, is China's Silicon Valley. It's here where companies like Apple have factories like Foxconn that bake B.C. copper into electronics like the computer you're reading this story on. Or into the phone in your pocket. But in capitalism's head-first race to the bottom, even Kunshan is feeling the pinch from even lower-cost manufacturing. (Photo Christopher Pollon)"
}
  var yunnan = {
    "map_id":4,
    "title":"Yunnan",
    "latitude":25.036756,
    "longitude":102.711333,
    "image":"",
    "read_more":ch4url,
    "description":"Where's the lowest-cost manufacturing? Not in Kunshan. Not any more. It's in places like Chengdu, Chongqing, and Yunnan. It's a combination of government stimulus, power and water scarcity, and the triple temptation of lower taxes, smaller wages and weaker environmental standards that combine to pull China's electronics production is being drawn westward."
  };
  var chengu = {
    "map_id":4,
    "title":"Chengdu",
    "latitude":30.5645,
    "longitude":104.069261,
    "image":"",
    "read_more":ch4url,
    "description":"Where's the lowest-cost manufacturing? Not in Kunshan. Not any more. It's in places like Chengdu, Chongqing, and Yunnan. It's a combination of government stimulus, power and water scarcity, and the triple temptation of lower taxes, smaller wages and weaker environmental standards that combine to pull China's electronics production is being drawn westward."
  };

  var chongqing ={
    "map_id":4,
    "title":"Chongqing",
    "latitude":29.559194,
    "longitude":106.551681,
    "image":"",
    "read_more":ch4url,
    "description":"Where's the lowest-cost manufacturing? Not in Kunshan. Not any more. It's in places like Chengdu, Chongqing, and Yunnan. It's a combination of government stimulus, power and water scarcity, and the triple temptation of lower taxes, smaller wages and weaker environmental standards that combine to pull China's electronics production is being drawn westward."
  };
  var abc_recycling = {
    "map_id":5,
    "title":"ABC Recycling, Fort St. John BC",
    "latitude":56.208739,
    "longitude":239.194358,
    "image":"img/CopperCoil.jpg",
    "read_more":ch5url,
    "description":"Back on this side of the Pacific, Christopher Pollon tracked what becomes of manufactured copper when its useful life is over. In B.C.'s Peace country, gas fields are generating plenty of scrap metal. Consolidated at ABC Recycling, used copper competes head-to-head with virgin  ore from mines like Alaska’s planned giant Pebble Mine. (Photo Giovanni Dall'Orto, Wikimedia Commons)"
  };
  var pebble_mine =  {
    "map_id":5,
    "title":"Pebble Mine",
    "latitude":59.829964,
    "longitude":204.900261,
    "image":"",
    "read_more":ch5url,
    "description":"Like oil, most high grade, easy-to-access ore bodies have already been tapped, meaning that miners will increasingly need to go to ever more remote, costlier, and difficult locations, exposing and crushing more rock from vaster pits, all to extract ever lower grades of ore. Proposals to develop the Pebble mine in Alaska, or KSM in northern B.C. — both huge, very low-grade copper deposits posing immense risks to the world's best salmon waters — could only have emerged in this era of \"tough ore\""
  };
  var sims_recycling =   {
    "map_id":6,
    "title":"Sims Recycling, Langley, BC",
    "latitude":49.103764,
    "longitude":237.518061,
    "image":"img/oldphones.jpg",
    "read_more":ch6url,
    "description":"In spite of the many finite resources in your phone, it is marketed as disposable. UN researchers predict by 2017 the total annual volume of used electronics will weigh as much as 200 Empire State Buildings. At the current rate, less than half will be in a bin like this at <a href=\"http://us.simsrecycling.com/Locations/Vancouver-BC\" target=\"_parent\">Sims Recycling</a> in Langley, B.C. (Photo Christopher Pollon) "  
  };



var ch2Path = drawTheLines('#334D5C', copper_mountain, mining_district);
var ch3Patha = drawTheLines('#45B29D', mining_district, osaka);
var ch3Pathb = drawTheLines('#45B29D', osaka, naoshima_island);
var ch4Path = drawTheLines('#EFC94C', naoshima_island, kunshan_china);
var ch5Path = drawTheLines('#E27A3F', kunshan_china, mining_district);
// var ch5Pathb = drawTheLines('#E27A3F', mining_district, abc_recycling);
var ch6Path = drawTheLines('#DF5A49', mining_district, sims_recycling);



var selected_chapter;






var map_1 = [copper_mountain];
var map_2 = [mining_district, galore_creek, kerr_sulphrets_mitchell, schaft_creek];
var map_3 = [naoshima_island, hishikari_mine, osaka];
var map_4 = [kunshan_china, yunnan, chengu, chongqing];
var map_5 = [abc_recycling, pebble_mine];
var map_6 = [sims_recycling];

var marker_collection_1 = [];
var marker_collection_2 = [];
var marker_collection_3 = [];
var marker_collection_4 = [];
var marker_collection_5 = [];
var marker_collection_6 = [];

load_markers(map_1, "#6bb372", marker_collection_1);
load_markers(map_2, "#334D5C", marker_collection_2);
load_markers(map_3, "#45B29D", marker_collection_3);
load_markers(map_4, "#EFC94C", marker_collection_4);
load_markers(map_5, "#E27A3F", marker_collection_5);
load_markers(map_6, "#DF5A49", marker_collection_6);




toggleMarkers(38.80128906584996, -185.05316809999997, null, 2);




chapter_select("#intro");



$('#intro h1').click(function(){
    chapter_select('#intro');
    toggleMarkers(38.80128906584996, -185.05316809999997, null, 2)
    $("#info-panel").fadeOut();

});

$("#chapter-one h1").click(function() {
  if (selected_chapter != "#chapter-one"){
    toggleMarkers(49.237485792789585, -120.02220664843756, marker_collection_1, 7)
  }
  chapter_select('#chapter-one');
});

$("#chapter-two h1").click(function() {
    if (selected_chapter != "#chapter-two"){
        toggleMarkers(53.68516233464379, -120.62072159375006, marker_collection_2, 5)
      }
    chapter_select("#chapter-two");
});

$("#chapter-three h1").click(function() {


      if (selected_chapter != '#chapter-three'){
	toggleMarkers(33.781484237781044, -223.39301225, marker_collection_3, 6)
}
  chapter_select('#chapter-three');


});
$("#chapter-four h1").click(function() {
      if (selected_chapter != '#chapter-four'){
	toggleMarkers(28.36392284994009, -240.04152268749996, marker_collection_4, 4)
      }
    chapter_select('#chapter-four');


});

$("#chapter-five h1").click(function() {
      if (selected_chapter != '#chapter-five'){
	toggleMarkers(56.208738999999966, -120.805642, marker_collection_5, 3)
    }
  chapter_select('#chapter-five');

});

$("#chapter-six h1").click(function() {
      if (selected_chapter != '#chapter-six'){
	     toggleMarkers(49.0794828622533, -122.37207571875, marker_collection_6, 9)
        }
  chapter_select('#chapter-six');

});








add_markers(marker_collection_1);
add_markers(marker_collection_2);
add_markers(marker_collection_3);
add_markers(marker_collection_4);
add_markers(marker_collection_5);
add_markers(marker_collection_6);





function showInfo(marker) {
  
	var elem = $("#info-panel .content");
	elem.fadeOut("fast", function(){
		elem.html(pin_content(marker)); 
    related_pins(marker);
    letsBounce(marker);
		$("#info-panel").fadeIn();
		elem.fadeIn();
		});
	}


function pin_content(marker) {
	var heading = marker.title,
	    body = marker.description,
	    read_more = marker.read_more,
	    image = marker.img,
	    html = [];

	if (heading.length > 0 ) {
		html.push("<h1>"+heading+"</h1>");
	}

	if (image.length > 0) {
		html.push("<img src='"+image+"' />");
	}

	if (body.length > 0) {
		html.push("<div class='marker_info'><p>"+body+"</p></div>");
	}

	if (read_more.length > 0) {
		html.push("<a href='"+read_more+"' target='_parent'>Full story...</a>");

	}


	var the_content = html.join('');

	return the_content;



}

function related_pins(current_marker) {
//   var array = current_marker.collection;
//   if (array.length > 1) {
//     var title = $('<h2/>', {text: "Other Locations"});
//     title.appendTo('#info-panel .content');
//   }
//   for (index = 0; index < array.length; ++index) {
//     var marker = array[index];
//     if (current_marker != marker) {
//         var title = marker.title;
//         var li = $('<span/>', {
//         class: 'pin-name',
//         text: title
//         });
//   li.appendTo('#info-panel .content');
    
//     getHandler(li, marker);
    
//     }
    

// }

}

function make_a_list(array){
                  showInfo(array[0]);
                  }



function load_markers(array, pin_color, save_array) {
	for (index = 0; index < array.length; ++index) {

	 image = { path: google.maps.SymbolPath.CIRCLE,
	           strokeColor: "#dedede",
              strokeOpacity: 1,
              strokeWeight: 3,
              fillColor: pin_color,
              fillOpacity: 0.95,
              scale: 15
  };
		make_marker(array[index], image, save_array);
	}
}

function transform_to_pin(pin, pin_color) {
	image = { path: google.maps.SymbolPath.CIRCLE,
	 strokeColor: "#dedede",
      strokeOpacity: 1,
      strokeWeight: 3,
      fillColor: pin_color,
      fillOpacity: 0.75,
      scale: 12
  };
		make_marker(pin, image);
	}

function getHandler(li, marker) {
    return $(li).on('click', li, function(){
		map.setZoom(5);
		letsBounce(marker);
    map.setCenter(marker.getPosition());
    showInfo(marker);
		})
}









$('#copper').click(function() {
  markerHighlight(marker_collection_1[0]);
}
);

$('#mining-district').click(function() {
  markerHighlight(marker_collection_2[0]);
}
);

$('#kerr').click(function() {
  markerHighlight(marker_collection_2[2]);
}
);

$('#galore').click(function() {
  markerHighlight(marker_collection_2[1]);
}
);  

$('#schaft').click(function() {
  markerHighlight(marker_collection_2[3]);
}
);

$('#mining-district').click(function() {
  markerHighlight(marker_collection_2[0]);
}
);

$('#naoshima').click(function() {
  markerHighlight(marker_collection_3[0]);
}
);

$('#hishikari').click(function() {
  markerHighlight(marker_collection_3[1]);
}
);

$('#osaka').click(function() {
  markerHighlight(marker_collection_3[2]);
}
);

$('#kunshan').click(function() {
  markerHighlight(marker_collection_4[0]);
}
);

$('#yunnan').click(function() {
  markerHighlight(marker_collection_4[1]);
}
);

$('#chengdu').click(function() {
  markerHighlight(marker_collection_4[2]);
}
);

$('#chonqing').click(function() {
  markerHighlight(marker_collection_4[3]);
}
);

$('#abc').click(function() {
  markerHighlight(marker_collection_5[0]);
}
);

$('#pebble').click(function() {
  markerHighlight(marker_collection_5[1]);
}
);

$('#sims').click(function() {
  markerHighlight(marker_collection_6[0]);
}
);
