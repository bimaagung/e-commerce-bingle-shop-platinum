### Model Aplikasi E-commerce

Sesuai module / Bingle Shop

### Installation

Installation project

- clone project `git clone https://github.com/bimaagung/maju-jaya-platinum-kelompok-1-BEJ.git`
- add node modules `npm install`
- rename file .env.example to .env
- configuration db in file .env
- create db `sequelize db:create`
- migrate table `sequelize db:migrate`
- fill the table with dummy data `sequelize db:migrate:all`

test each endpoint in postman

- open postman
- import file platinum-maju-jaya.postman_collection.json in postman
- import file platinum-maju-jaya.postman_environment.json in postman
- change environment to `Platinum Maju Jaya`
- choose folder Platinum Maju Jaya and run

add apm elk for logging and monitoring

- change `serverUrl: 'http://YOUR_IP:8200'` in file `app.js`
- change `hosts: ['YOUR_IP:9200']` in file `vendor/apm-elk/apm-server.yml`
- run docker compose `docker-compose up -d`
- open browser `http://localhost:5601/`
- login 

	username : `elastic`
	password : `elastic1234`

- choose menu apm in slide bar
- choose add data
- choose Tab Elatic APM in Fleet
- Click APM Server Status make sure it's success
- Choose Tab Node js
- Click agent status if `No data has been received from agents yet` skip no problem
- Click Load Kibana object make sure it's success if failed , click again
- Launch APM

### Entity

- User (Customer / Admin)
- Item 
- Order
- OrderDetail

## API Spec

### Customer

### Login

Request:

	- Method : POST
	- Endpoint : `api/user/login`
	
Body :

```json
	{
		"email or username" : "abc"
		"password" : "abcd100"
	}
```
Response :

```json
	{
		"status" : "ok"
		"message": "success"
		"token"  : "nsajdkasjdbhqwuu&^&%^bhjasc"
	}
```

### Register
Request:

	- Method : POST
	- Endpoint : `api/user/register`
	
Body :
  
```json
	{
		"nama"    : "abc"
		"username": "abc"
		"email"   : "abc@domain.com"
		"password": "abcd100"
	}
```

Response :
  
```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"nama"     : "abc"
			"username" : "abc"
			"email"    : "abc@domain.com"
		}
	}
```

### // TODO : Masih dalam pembahasan
### Lihat data user

Request:

	- Method : GET
	- Endpoint : `api/user/profile/`

Header :

	- Authorization : Bearer Token
	
Response :

```json
	{
		"status" : "ok"
		"message": "success"
		"data" : "{}"
	}
```

### Update data user

Request:

	- Method : PUT
	- Endpoint : `api/user/`
	
Header :
	
	- Authorization : Bearer Token
	
Body :

```json
	{
		"nama"     : "abc"
		"username" : "abc"
		"email"    : "abc@domain.com"
		"alamat"   : "Jakarta"
		"telp"     : "08736272767"
	}
```

Response :

```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"nama"     : "abc"
			"username" : "abc"
			"email"    : "abc@domain.com"
			"alamat"   : "Jakarta"
			"telp"     : "08736272767"
		}
	}
```

### Lihat pesanan

Request:

	- Method : GET
	- Endpoint : `api/order/`
	
Header :
	
	- Authorization : Bearer Token
	
Response :

```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"order_id"    : "1"
			"status"      : "Submit"
			"total_item"  : "2"
			"total_price" : "20000"
			"user": {
				"name" : "abc"
			},
			"order_detail" : [
				{
					"name"        : "barang1"
					"category"    : "category A"
					"qty"         : "10"
					"total_price" : "10000"
				},
				{
					"name"        : "barang2"
					"category"    : "category A"
					"qty"         : "10"
					"total_price" : "10000"
				}
			]
		}
	}
```

### Update pesanan

Request:

	- Method : PUT
	- Endpoint : `api/order/`
	
Header :
	
	- Authorization : Bearer Token
	
Body :

```json
	{
		"order_id"    : "1"
		"user_id"     : "1"
		"order_detail" : [
			{
				"id"    : "barang1"
				"name"  : "category A"
				"qty"   : "10"
			},
			{
				"id"    : "barang2"
				"name"  : "category B"
				"qty"   : "10"
			}
		]
	}
```

Response :

```json
	{
		"status" : "ok"
		"message"  : "success"
		"data" : {
			"order_id"    : "1"
			"user_id"     : "1"
			"order_detail" : [
				{
					"id"    : "barang1"
					"name"  : "category A"
					"qty"   : "10"
				},
				{
					"id"    : "barang2"
					"name"  : "category B"
					"qty"   : "10"
				}
			]
		}
	}

```
### Lihat data barang Product (item)
Request:

	- Method : GET
	- Endpoint : `api/user/product`
	
Response :
  
```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"id"	: "1" 
			"nama"	: "abc"
			"image"	: "<img>"
			"price" : "20000"
			"sold"	: "3"
		}
	}
```


### Lihat data barang Product (item) Detail
Request:

	- Method : GET
	- Endpoint : `api/user/product/:id`
	
Response :
  
```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"id" 	       : "1" 
			"nama"         : "abc"
			"price"        : "20000"
			"stock"	       : "10"
			"sold"	       : "3"
			"image"        : "<img>"
			"description"  : "lorem ipsum"
			"category_id"   : "3"

		}
	}
```
### Lihat data Category (item)
Request:

	- Method : GET
	- Endpoint : `api/user/category`
	
Response :
  
```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"id" 	      : "1" 
			"nama"        : "abc"
				}
	}
```


### Lihat data  Product By Category (item) Detail
Request:

	- Method : GET
	- Endpoint : `api/user/category/product`
	
Response :
  
```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"id"       : "1" 
			"nama"     : "abc"
			"Products" : [
				{
					"id" 	      : "1" 
					"nama"        : "abc"
					"image"		  : "<img>"
					"price"       : "20000"
					"sold"		  : "3"
				},
				{
					"id" 	      : "2" 
					"nama"        : "abc"
					"image"		  : "<img>"
					"price"       : "15000"
					"sold"		  : "10"
				}
			]
		}
	}
```
### Admin

### Login
Request:

	- Method : POST
	- Endpoint : `api/admin/login`
	
Body :

```json
	{
		"email or username" : "abc"
		"password" : "abcd100"
	}
```
Response :

```json
	{
		"status" : "ok"
		"message": "success"
		"token"  : "nsajdkasjdbhqwuu&^&%^bhjasc"
	}
```

### Add data barang (product)
Request:

	- Method : POST
	- Endpoint : `api/admin/product/add`
	
Body :
  
```json
	 {
			"nama"         : "abc"
			"price"        : "20000"
			"stock"	       : "10"
			"image"        : "<img>"
			"description"  : "lorem ipsum"
			"category_id"   : "3"

	}
```


Response :
  
```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"id" 	       : "1" 
			"nama"         : "abc"
			"price"        : "20000"
			"stock"        : "10"
			"sold"	       : "3"
			"image"        : "<img>"
			"description"  : "lorem ipsum"
			"category_id   : "3"
			"updatedAt"    : "2022-09-04T02:29:43.937Z",
        		"createdAt"    : "2022-09-04T02:29:43.937Z"

		}
	}
```


### Update data barang

Request:

	- Method : PUT
	- Endpoint : `api/admin/product/update`
	
Body :
  
```json
	{
		"nama"         : "abc"
		"price"        : "20000"
		"stock"		   : "10"
		"image"        : "<img>"
		"description"  : "lorem ipsum"
		"category_id"   : "3"

	
	}
```


Response :
  
```json
	{
		"status" : "ok"
		"message": "success"
		"data" : {
			"id" 	       : "1" 
			"nama"         : "abc"
			"price"        : "20000"
			"stock"		   : "10"
			"sold"		   : "3"
			"image"        : "<img>"
			"description"  : "lorem ipsum"
			"category_id"   : "3"
			"updatedAt"	   : "2022-09-04T02:29:43.937Z"
        	"createdAt"    : "2022-09-04T02:29:43.937Z"

		}
	}
```

### Delete data barang

Request:

	- Method : Delete
	- Endpoint : `api/admin/product/delete/:id`
	
Response :

```json
	{
    	"status": "ok"
    	"message": "Berhasil menghapus product"
    	"data": {
        	"is_success": true,
       		 "product": 1
   	 	}
	}
```

### Add data barang (Category)

Request:

	- Method : POST
	- Endpoint : `api/admin/category/add`
	
Body :
  
```json
	{

		"nama"   : "abc"

	}
```


Response :
  
```json
	{
    "status"	: "ok"
    "message"	: "Berhasil menanbahkan Category"
    "data"		: {
       		"id"		: 3
        	"name"		: "jaket"
        	"updatedAt" : "2022-09-04T02:44:47.607Z"
        	"createdAt" : "2022-09-04T02:44:47.607Z"
    }
}
```
### Update data barang (Category)

Request:

	- Method : PUT
	- Endpoint : `api/admin/category/update`
	
Body :
  
```json
	{
		"nama"   : "abc"
	}
```


Response :
  
```json
	{
    "status"	: "ok"
    "message"	: "Berhasil menanbahkan Category"
    "data"		: {
       		"id"		: 3
        	"name"		: "Celana"
        	"updatedAt" : "2022-09-04T02:44:47.607Z"
        	"createdAt" : "2022-09-04T02:44:47.607Z"
    }
}
```
### Delete data Category


Request:

	- Method : Delete
	- Endpoint : `api/admin/category/delete/:id`
	
Response :

```json
	{
    	"status": "ok"
    	"message": "success"
    	"data": {
        	"is_success": true,
       		 "product": 1
   	 	}
	}
```


### Update status pesanan

Request:

	- Method : PATCH
	- Endpoint : `api/admin/order/change_status/{order_id}`
	
Body :
  
```json
	{
		"status"   : "COMPLETED"
	}
```


Response :
  
```json
	{
    "status"	: "ok"
    "message"	: "Berhasil mengubah status"
    "data"	: {
       		"id"		: 3
		"user_id"	: 3
        	"status"	: "Completed"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    }
}
```


### Lihat status Submited pesanan

Request:

	- Method : GET
	- Endpoint : `api/admin/order?status = Submited`
	
Response :
  
```json
	{
    "status"	: "ok"
    "message"	: "Berhasil mengambil order dengan status submited"
    "data"	: [
    	{
       		"id"		: 3
		"user_id"	: 3
        	"status"	: "Submited"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	},
	{
       		"id"		: 4
		"user_id"	: 2
        	"status"	: "Submited"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	}
    ]
}
```

### lihat status Prosses pesaanan

Request:

	- Method : GET
	- Endpoint : `api/admin/order?status = process`
	
Response :
  
```json
	{
    "status"	: "ok"
    "message"	: "Berhasil mengambil order dengan status process"
    "data"	: [
    	{
       		"id"		: 3
		"user_id"	: 6
        	"status"	: "process"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	},
	{
       		"id"		: 5
		"user_id"	: 4
        	"status"	: "process"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	}
    ]
}
```

### lihat status Complete Pesanan

Request:

	- Method : GET
	- Endpoint : `api/admin/order?status = Completed`
	
Response :
  
```json
	{
    "status"	: "ok"
    "message"	: "Berhasil mengambil order dengan status completed"
    "data"	: [
    	{
       		"id"		: 3
		"user_id"	: 3
        	"status"	: "Completed"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	},
	{
       		"id"		: 4
		"user_id"	: 2
        	"status"	: "Completed"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	}
    ]
}
```

### Lihat semua data user


Request:

	- Method : GET
	- Endpoint : `api/admin/user`
	
Response :
  
```json
	{
    "status"	: "ok"
    "message"	: "Berhasil mengambil semua user"
    "data"	: [
    	{
       		"id"		: 1
		"name"		: "abc"
        	"username"	: "abc123"
		"email"		: "abc@gmail.com"
		"telp"		: "084878293"
		"alamat"   	: "Jakarta"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	},
		{
       		"id"		: 2
		"name"		: "abc2"
        	"username"	: "abc1234"
		"email"		: "abc2@gmail.com"
		"telp"		: "084878293"
		"alamat"   	: "Jakarta"
        	"updatedAt" 	: "2022-09-04T02:44:47.607Z"
        	"createdAt" 	: "2022-09-04T02:44:47.607Z"
    	}
    ]
}
```
