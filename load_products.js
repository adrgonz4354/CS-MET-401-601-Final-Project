

var product_page_content = "";

var cart = [ ]; 

var buy_now_cart = [];


const load_home_page = function()
{
	product_page.style="color:black;"
	product_page.innerHTML = document.getElementById('home_page').innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
	load_home_page();
});
const search_per_product = function(product_data, tags)
{
	var results = [];
	console.log(tags);
		var thres = 0;
		for(var p_c = 0; p_c < product_data.length; p_c++)
		{
			for(var t = 0; t < tags.length; t++)
			{
				if (product_data[p_c].product_name.toLowerCase().includes(tags[t].toLowerCase()) == true)
				{
					thres+=1;
				}
			}
			if(thres==tags.length)
			{
				results.push(product_data[p_c]);
				add_product_to_page(product_data[p_c].product_id,product_data[p_c].product_photo, product_data[p_c].product_price, product_data[p_c].product_name, product_data[p_c].desc);
			}
			thres=0;
		}
	return results;
}
const search_query = function()
{
	var search = document.getElementById('search_text').value;
	var tags = search.split(" ");

	clear_page();
	search_per_product(product_chairs, tags);
	search_per_product(product_couches, tags);
	search_per_product(product_tables, tags);
	search_per_product(bedroom_accessories, tags);
	search_per_product(kitchen_accessories, tags);
	search_per_product(bathroom_accessories, tags);
	product_page.style="color:black";
	product_page.innerHTML+= "<h3> Results for '" + tags + "' </h3>";
	product_page.innerHTML+="<hr/>";

	product_page.innerHTML+= '<div class="row" >' + product_page_content + '</div>';

}
const thank_you = function()
{
	product_page.innerHTML = "<center> <h1> Thank you for your purchase! </h1>"+
							 "<h2>:)</h2>"+
							 " <p>Please check your email for order confirmation information. <br/>"+
							 "If you are having issues, please contact our customer support number 123-456-7890</p></center>";
}
const get_receipt = function()
{

	console.log(cart);
	product_page_content+='<div class="card">'+
					'<h2> Receipt </h2>'+
					'<hr />'+
					'<div class="card" style="position:relative; left:-10px;">';
	var sum = 0;
	for(var x = 0; x < cart.length; x++)
	{

		product_page_content+= '<div class="row">'+
							   '<div class="col-sm"> PRODUCT_NAME: '+
									cart[x].product_name+
								'</div>'+
								'<div class="col-sm">'+
									'PRODUCT ID:'+cart[x].product_id+
								'</div>'+
								'<div class="col-sm">'+
									'PRICE: $'+cart[x].product_price+
								'</div>'+
								'</div>';
		sum+=parseFloat(cart[x].product_price);

		
	}
	
	product_page_content+='</div><div class="row">'+
							'<div class="col-sm">'+
							'TOTAL: $'+sum+
							'</div>'+
							'</div>'+
							'</div>';
	product_page.innerHTML+= product_page_content;
}
const payment_processing = function()
{
	clear_page();
	product_page.style="color:black;"
	product_page.innerHTML = document.getElementById('payment_processing_page').innerHTML;
	get_receipt();
	product_page.innerHTML+='<center><button class="btn btn-primary" onclick="thank_you();"> Make payment </button></center>'
}

const update_page = function() 
{
	var product_page = document.getElementById('product_page');
	product_page.innerHTML = '<div class="row" >' + product_page_content + '</div>';
};


const add_to_cart = function(product_image, product_price, product_name, product_desc, product_id)
{
	cart.push({product_image, product_price, product_name, product_desc, product_id});
}

const remove_from_cart = function(index)
{
	cart.splice(index, 1); 
	load_cart();
}
const load_cart = function()
{
	clear_page();

	product_page_content+='<h1>Your cart</h1>';
	product_page_content+='<hr/>';

	var sum = 0; 

	for (var k = 0; k < cart.length; k++)
	{
		
		console.log(cart[k].product_name);
		product_page_content+='<div class="card" style="height:100px; width:max-width;">';
		product_page_content+= (k+1)+'. <img src="'+cart[k].product_image+'" style="position: relative; width:50px; height:50px; top:10px; left:10px;" />';
		product_page_content+='<div style="position:relative; top:-25px; left:70px;">'+cart[k].product_name+'</div>';
		product_page_content+='<div style="position:relative; color:red; top:-48px; text-align: right; right:20px;"><button class="btn btn-outline-danger"  onclick="remove_from_cart('+k+');">Remove</button></div>';
		product_page_content+='<div style="position:relative; color:green; top:-75px; text-align: right; right:120px;">$'+cart[k].product_price+'</div>';
		product_page_content+='</div>';
		sum+=parseFloat(cart[k].product_price);

	}

	product_page_content+='<div class="card" style=" width:max-width;">';
	product_page_content+='<strong>Total:</strong>';
	product_page_content+='<p style="text-align: right; position:absolute; right:20px; color:green">$'+sum.toFixed(2);+'</p>';
	product_page_content+='</div>';
	product_page_content+='<hr/>';
	product_page_content+='<center><button class="btn btn-primary" onclick="payment_processing();"> Proceed to payment processing </button></center>';
	product_page.style = 'color:black;';
	product_page.innerHTML = product_page_content;
}
const clear_page = function()
{

	var product_page = document.getElementById('product_page');
	product_page.style="";
	product_page.innerHTML = "";
	product_page_content = "";
};
const load_product_page = function( product_image, product_price, product_name, product_desc, product_id)
{
	clear_page();
	var product_page = document.getElementById('product_page');
	product_page.style="height:700px; color:black;";
	var product = '<h1 style="color:black;">'+product_name+'</h1>'+
					   '<img src='+product_image+' width="600" height="600" />'+
			           '<div class="card" style="position:relative; left:600px; width:300px; bottom:570px;">'+
				       '<h5>Product Description</h5>'+
				       '<hr/>'+
				       '<p>'+product_desc+'</p>'+
				       '<hr/>'+
				       '<h1>Price <span style="color:green;">$'+product_price+'</span></h1>'+
				       '<hr/>'+
				       '<button class="btn btn-primary" style="position:relative; bottom:10px;" id="cart_add" onclick="'+`add_to_cart('${product_image}','${product_price}', '${product_name}', '${product_desc}','${product_id}'`+')"> Add to cart  <img src="buttons/add_to_cart_button.png" style="width:20px; height:20px;"/></button>'+
					   '<button class="btn btn-primary" onclick="'+`add_to_cart('${product_image}','${product_price}', '${product_name}', '${product_desc}','${product_id}'`+'); load_cart();"> Buy now </button>'+
			           '</div>';	  
	product_page.innerHTML=product;
};
const add_product_to_page = function(product_id, product_image, product_price, product_name, product_desc)
{
		var product_card = '<div class="card" style="width:300px; height:400px; color:black;">'+
							'<center> <img src="'+product_image+'" class="product_image" /> </center>'+
							'<br/>'+
							'<label><h3  style="position:relative; top:10px;">'+product_name+'</h3></label>'+
							'<label><h8> Price : $'+product_price+'</h8></label>'+
							'<button type="button" class="btn btn-primary" style="width:200px; position:relative; left:50px;" onclick="' + `load_product_page('${product_image}',' ${product_price}', '${product_name}', '${product_desc}','${product_id}'`+');">View Product</button>'+
							'</div>';

		product_page_content+=product_card; 

};


const load_section = function(product_type)
{

	clear_page();

	switch(product_type)
	{
		case "chairs":
			for(var x = 0; x < product_chairs.length; x++)
			{
				add_product_to_page(product_chairs[x].product_id, product_chairs[x].product_photo, product_chairs[x].product_price, product_chairs[x].product_name, product_chairs[x].desc);
			}
		break;
		case "couches": 
		for(var x = 0; x < product_couches.length; x++)
			{
				add_product_to_page(product_couches[x].product_id, product_couches[x].product_photo, product_couches[x].product_price, product_couches[x].product_name, product_couches[x].desc);
			}
		break;
		case "tables": 
		for(var x = 0; x < product_tables.length; x++)
			{
				add_product_to_page(product_tables[x].product_id, product_tables[x].product_photo, product_tables[x].product_price, product_tables[x].product_name, product_tables[x].desc);
			}
		break;
		
		case "bedroom": 
		for(var x = 0; x < bedroom_accessories.length; x++)
			{
				add_product_to_page(bedroom_accessories[x].product_id, bedroom_accessories[x].product_photo, bedroom_accessories[x].product_price, bedroom_accessories[x].product_name, bedroom_accessories[x].desc);
			}
		break;
		case "kitchen": 
		for(var x = 0; x < kitchen_accessories.length; x++)
			{
				add_product_to_page(kitchen_accessories[x].product_id, kitchen_accessories[x].product_photo, kitchen_accessories[x].product_price, kitchen_accessories[x].product_name, kitchen_accessories[x].desc);
			}
		break;
		case "bathroom": 
		for(var x = 0; x < bathroom_accessories.length; x++)
			{
				add_product_to_page(bathroom_accessories[x].product_id, bathroom_accessories[x].product_photo, bathroom_accessories[x].product_price, bathroom_accessories[x].product_name, bathroom_accessories[x].desc);
			}
		break;

	}

	update_page();
};