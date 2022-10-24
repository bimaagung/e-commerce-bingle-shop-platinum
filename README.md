### Model Aplikasi E-commerce

![ERD PLATINUM](https://user-images.githubusercontent.com/107734134/197455237-204a9764-d401-4166-9ae9-7e4959f7e723.png)


Sesuai module / Bingle Shop

### Installation

Installation project - manual

- clone project `git clone https://github.com/bimaagung/maju-jaya-platinum-kelompok-1-BEJ.git`
- add node modules `npm install`
- rename file .env.example to .env
- configuration db in file .env
- create db `sequelize db:create`
- migrate table `sequelize db:migrate`
- fill the table with dummy data `sequelize db:seed:all`
- run docker elk apm and customize .env

test each endpoint in swagger

- enter swagger for customer : localhost:3000/docs - for customer
- enter swagger for admin : localhost:3000/docs/admin
- login and get token  
- add token in authorization (in accordance auth)
- testing all endpoint

Installation project - docker

- customize env in docker compose -> platinum
- run docker compose in project
- open terminal container platinum in docker 
- create db `sequelize db:create`
- migrate table `sequelize db:migrate`
- fill the table with dummy data `sequelize db:migrate:all`
- open kibana in open browser
- open localhost:3000 in browswe


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

```
json
	{
		"email or username" : "abc"
		"password" : "abcd100"
	}
```
Response success:

```
json
	{
		"status" : "ok"
		"message": "success"
		"token"  : "nsajdkasjdbhqwuu&^&%^bhjasc"
	}
```
Response failed:
```
json
	{
		"status" : "failed"
		"message": "incorect email or password"
	}
```

### Register
Request:

	- Method : POST
	- Endpoint : `api/user/register`
	
Body :
  
```
From data
	{
		"nama"    : "abc"
		"username": "abc"
		"image"   : seleect file
		"email"   : "abc@domain.com"
		"password": "abcd100"
		"confirmPassword : "abcd100"
		"otp_code : "512312"
	}
```

Response success :
  
```
json
			{
		  "status": "ok",
		  "message": "success",
		  "data": {
		    "user": {
		      "id": 72,
		      "name": "Customer B",
		      "username": "customer_b",
		      "image": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815145/default%20image/profile_xzrsh7.png",
		      "telp": "083637267",
		      "email": "customerb@gmail.com",
		      "is_admin": false,
		      "updatedAt": "2022-10-18T02:01:39.871Z",
		      "createdAt": "2022-10-18T02:01:39.871Z"
		    },
		    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzI"
		  }
		}
```
response failed :
  
```
json
		{
		  "status": "failed",
		  "message": "invalid otp code"
		}
```
response failed :
  
```
json
		
		 {
		  "status": "failed",
		  "message": "password and confrim password not match"
		 }
		
```
response failed :
  
```
json
		
		 {
		  "status": "failed",
		  "message": "username or email not aviable"
		 }
		
```
### Login & Register with Google OAuth

Request:

	- Method : POST
	- Endpoint : `/login/google`
	
Body :

```
json
	{
		"idToken" : {
			      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMWI5Zjg4Y2ZlMzE1MWRkZDI4NGE2MWJmOGNlY"
			    }
```
Response success:

```
json
	{
		    "status": "ok",
		    "message": "success",
		    "data": {
			"user": {
			    "id": 3,
			    "name": "customer Name",
			    "username": "Custmer874",
			    "image": "https://res.cloudinary.com/dnvltueqb/image/upload/defaultimage",
			    "email": "customer8@gmail.com",
			    "is_admin": false,
			    "updatedAt": "2022-10-24T04:10:05.429Z",
			    "createdAt": "2022-10-24T04:10:05.429Z",
			    "telp": null
			},
			"token":  "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMWI5Zjg4Y2ZlMzE1MWRkZDI4NGE2MWJmOGNlY"
		    }
}


```
### Lihat data user

Request:

	- Method : GET
	- Endpoint : `/api/customer/profil/user/`

Header :

	- Authorization : Bearer Token
	
Response :

```
json
	{
		  "status": "ok",
		  "message": "success",
		  "data": {
		    "id": 2,
		    "name": "customer",
		    "username": "customer",
		    "image": null,
		    "telp": "0823111111",
		    "email": "customer@mail.com",
		    "createdAt": "2022-10-24T01:33:25.885Z",
		    "updatedAt": "2022-10-24T01:33:25.885Z"
 	 		}
	}
```

### Update data user

Request:

	- Method : PUT
	- Endpoint : `api/customer/update/`
	
Header :
	
	- Authorization : Bearer Token
	
Body :

```
json
	{
		"nama"     : "abc"
		"username" : "abc"
		"email"    : "abc@domain.com"
		"alamat"   : "Jakarta"
		"telp"     : "08736272767"
	}
```
### Update password user

Request:

	- Method : PUT
	- Endpoint : `/api/customer/update-password/`
	
Header :
	
	- Authorization : Bearer Token
	
Body :

```
json
	{
	  "newPassword": "123456789",
	  "confirmNewPassword": "123456789"
	}
```

Response :

```
json
	{
	  "status": "ok",
	  "message": "success"
	}
```
### Forget password user

Request:

	- Method : PUT
	- Endpoint : `/api/customer/reset-password/`
	
Header :
	
	- Authorization : Bearer Token
	
Body :

```
json
	  {
		  "newPassword": "password",
		  "confirmNewPassword": "password",
		  "otp_code": "512315"
	}
```

Response :

```
json
	{
	  "status": "ok",
	  "message": "success"
	}
```
### Update Email user

Request:

	- Method : PUT
	- Endpoint : `/api/update/email/`
	
Header :
	
	- Authorization : Bearer Token
	
Body :

```
json
		{
		  "email": "newemail@mail.com",
		  "otp_code": "122351"
		}
```

Response :

```
json
	{
	  "status": "ok",
	  "message": "success"
	}
```

### Lihat Alamat  (User)
Request:

	- Method : GET
	- Endpoint : `api/customer/all/address/`
header :
	
	- Authorization : Bearer Token
	
Response :
  
```
json
			{
		  "status": "ok",
		  "message": "success",
		  "data": [
		    {
		      "id": 1,
		      "province": "Jawa Barat",
		      "city": "Garut",
		      "postal_code": "44151",
		      "detail": "Jl.Pembangunan no 56 kec.Sukaregang",
		      "user_id": 2,
		      "main_address": true,
		      "createdAt": "2022-10-24T01:33:25.308Z",
		      "updatedAt": "2022-10-24T01:33:25.308Z"
		    }
		  ]
		}
```


### Update Alamat 
Request:

	- Method : PUT
	- Endpoint : `/api/customer/address/update/:id`
 header :
	
	- Authorization : Bearer Token
	
	
Response :
  
```
json
		{
		  "status": "ok",
		  "message": "success"
		}
```
### Ubah Alamat Utama
Request:

	- Method : PUT
	- Endpoint : `api/customer/address/update-main-address/:id`
 header :
	
	- Authorization : Bearer Token
	
	
Response :
  
```
json
		{
		  "status": "ok",
		  "message": "success"
		}
```

### Delete Alamat

Request:

	- Method : Delete
	- Endpoint : `api/admin/product/delete/:id`
 header :
	
	- Authorization : Bearer Token
	
Response :

```
json
	{
	 "status": "ok",
	  "message": "success"
	}
```
### TAMBAH PESANAN

Request:

	- Method : PUT
	- Endpoint : `api/customer/order/add`
	
Header :
	
	- Authorization : Bearer Token
	
Body :

```
json
	{
  "products": [
    {
      "id": 1,
      "qty": 3
    }
  ]
}
```

Response :

```
json
			{
		  "status": "ok",
		  "message": "success",
		  "data": {
		    "order_id": "bQ660uV5EW6vSXe-",
		    "products": [
		      {
			"id": 1,
			"name": "Asus ROG Zephyrush M16",
			"description": "Laptop gaming dari asus",
			"category_id": 1,
			"sold": 20,
			"price": 30000000,
			"stock": 10,
			"createdAt": "2022-10-13T09:31:19.370Z",
			"updatedAt": "2022-10-14T04:51:49.715Z",
			"ProductImages": [
			  {
			    "id": 1,
			    "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg"
			  }
			]
		      }
		    ]
		  }
		}

```
### Lihat pesanan

Request:

	- Method : GET
	- Endpoint : `api/customer/order/pending`
	
Header :
	
	- Authorization : Bearer Token
	
Response :

```
json
		{
		  "status": "ok",
		  "message": "success",
		  "data": {
		    "id": "aX4Rjf6-jm342b4T",
		    "status": "PENDING",
		    "created_at": "2022-10-24T04:45:44.384Z",
		    "updated_at": "2022-10-24T04:45:44.384Z",
		    "qty": 3,
		    "total_price": 90000000,
		    "user": {
		      "id": 2,
		      "name": "Customer A",
		      "username": "customer",
		      "telp": "08363372",
		      "address": {
			"id": 1,
			"province": "Jawa Tengah",
			"city": "Semarang",
			"postal_code": "50139",
			"detail": "Jl. Pemuda, Semarang Tengah"
		      }
		    },
		    "products": [
		      {
			"id": 1,
			"name": "Asus ROG Zephyrush M16",
			"category": "other",
			"price": 30000000,
			"qty": 3,
			"total_price": 90000000
		      }
		    ]
		  }
		}
```

### DELETE PESANAN

Request:

	- Method : Delete
	- Endpoint : `/api/customer/order/cancel`
 header :
	
	- Authorization : Bearer Token
	
Response :

```
json
	{
	 "status": "ok",
	  "message": "success"
	}
```


### Lihat data barang Product (item)
Request:

	- Method : GET
	- Endpoint : `api/user/product`
	
Response :
  
```
json
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
### PUBLIC END POINT
### Lihat Semua data barang Product 
Request:

	- Method : GET
	- Endpoint : `api/public/product`
	
Response :
  
```
json
			{
		  "status": "ok",
		  "message": "success",
		  "data": [
		    {
		      "id": 1,
		      "name": "Asus ROG Zephyrush M16",
		      "description": "Laptop gaming dari asus",
		      "category_id": 10,
		      "sold": 0,
		      "price": 30000000,
		      "stock": 20,
		      "cover_imageID": 1,
		      "createdAt": "2022-10-24T01:33:25.895Z",
		      "updatedAt": "2022-10-24T02:39:47.435Z",
		      "ProductImages": [
			{
			  "id": 1,
			  "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg"
			}
		      ]
		    },
		    {
		      "id": 2,
		      "name": "Macbook pro M2",
		      "description": "Laptop gaming dari apple",
		      "category_id": 10,
		      "sold": 0,
		      "price": 25000000,
		      "stock": 30,
		      "cover_imageID": 2,
		      "createdAt": "2022-10-24T01:33:25.895Z",
		      "updatedAt": "2022-10-24T02:39:47.107Z",
		      "ProductImages": [
			{
			  "id": 2,
			  "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg"
			}
		      ]
		    }
		      ]
		    }
		  ]
		}
```
### Lihat Semua image  Product 
Request:

	- Method : GET
	- Endpoint : `/api/public/image/product/:id`
	
Response :
  
```json
		{
  "status": "ok",
  "message": "success",
  "data": [
    {
      "id": 1,
      "url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg",
      "cover_image": true,
      "product_id": 1,
      "createdAt": "2022-10-24T01:33:25.238Z",
      "updatedAt": "2022-10-24T01:33:25.238Z"
    }
  ]
}
```
### Lihat data barang Product (item) Detail
Request:

	- Method : GET
	- Endpoint : `/api/public/product/:id`
	
Response :
  
```json
			{
			  "status": "ok",
			  "message": "success",
			  "data": {
			    "id": 1,
			    "name": "Asus ROG Zephyrush M16",
			    "description": "Laptop gaming dari asus",
			    "category_id": 10,
			    "sold": 0,
			    "price": 30000000,
			    "stock": 20,
			    "cover_imageID": 1,
			    "createdAt": "2022-10-24T01:33:25.895Z",
			    "updatedAt": "2022-10-24T02:39:47.435Z",
			    "ProductImages": [
			      {
				"id": 1,
				"url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg",
				"cover_image": true,
				"product_id": 1,
				"createdAt": "2022-10-24T01:33:25.238Z",
				"updatedAt": "2022-10-24T01:33:25.238Z"
			      }
			    ]
			  }
			}
```
### Lihat data Category (item)
Request:

	- Method : GET
	- Endpoint : `api/public/category`
	
Response :
  
```json
			{
			  "status": "ok",
			  "message": "success",
			  "data": [
			    {
			      "id": 1,
			      "name": "Laptop",
			      "createdAt": "2022-10-24T01:33:25.748Z",
			      "updatedAt": "2022-10-24T01:33:25.748Z"
			    },
			    {
			      "id": 10,
			      "name": "other",
			      "createdAt": "2022-10-24T02:39:47.038Z",
			      "updatedAt": "2022-10-24T02:39:47.038Z"
			    }
			  ]
			}
```


### Lihat data  Product By Category (item) Detail
Request:

	- Method : GET
	- Endpoint : `/api/public/category/:id`
	
Response :
  
```json
		{
		  "status": "ok",
		  "message": "success",
		  "data": [
		    {
		      "id": 1,
		      "name": "Camera",
		      "createdAt": "2022-10-13T09:31:19.311Z",
		      "updatedAt": "2022-10-13T09:31:19.311Z"
		    }
		  ]
		}
```
### ADMIN END POINT

### Add data barang (product)
Request:

	- Method : POST
	- Endpoint : `api/admin/product/add`
header :
	
	- Authorization : Bearer Token
	
	
Body :
  
```
json
	      {
		  "name": "Microsoft Surface Laptop Studio i7",
		  "description": "Microsoft Surface Studio i7 Generation 11 with Ram 16GB, SSD 512GB, and RTX 3050",
		  "category_id": 1,
		  "price": 34000000,
		  "stock": 30
		}
```


Response :
  
```
json
		{
		  "status": "ok",
		  "message": "success",
		  "data": {
		    "id": 10,
		    "name": "Microsoft Surface Laptop Studio i7",
		    "description": "Microsoft Surface Studio i7 Generation 11 with Ram 16GB, SSD 512GB, and RTX 3050",
		    "category_id": 1,
		    "sold": 0,
		    "price": 34000000,
		    "stock": 30,
		    "cover_imageID": 10,
		    "createdAt": "2022-10-24T05:08:56.444Z",
		    "updatedAt": "2022-10-24T05:08:56.458Z",
		    "ProductImages": [
		      {
			"id": 10,
			"url": "https://res.cloudinary.com/dnvltueqb/image/upload/v1663815144/default%20image/default_product_w8fe1a.jpg",
			"cover_image": true,
			"product_id": 10,
			"createdAt": "2022-10-24T05:08:56.451Z",
			"updatedAt": "2022-10-24T05:08:56.451Z"
		      }
		    ]
		  }
		}
```


### Update data barang

Request:

	- Method : PUT
	- Endpoint : `api/admin/product/update/:id`
header :
	
	- Authorization : Bearer Token
	
	
Body :
  
```
json
		{
		  "name": "Microsoft Surface Laptop Studio i7",
		  "description": "Microsoft Surface Studio i7 Generation 11 with Ram 16GB, SSD 512GB, and RTX 3050",
		  "category_id": 1,
		  "price": 31000000,
		  "stock": 50
		}


Response :
  
```
json
		{
		  "status": "ok",
		  "message": "success"
		}
```
```
### Update cover Image

Request:

	- Method : PUT
	- Endpoint : `api/admin/update-cover/`
header :
	
	- Authorization : Bearer Token
	
	
Body :
  
```
query
		image_id : 4
		product_id :1


Response :
  
```
json
		{
		  "status": "ok",
		  "message": "success"
		}
```
```
### Tambah image product

Request:

	- Method : PUT
	- Endpoint : `api/admin/update-cover/`
header :
	
	- Authorization : Bearer Token
	
	
Body :
  
```
from data
		image_id : 4
		url : your imgae url


Response :
  
```
json
```
		{
    "status": "ok",
    "message": "success",
    "data": {
        "id": 12,
        "url": "http://res.cloudinary.com/dnvltueqb/image/upload/v1666588826/product/1666588824864_download_z0asyk.jpg",
        "product_id": 5,
        "cover_image": false,
        "updatedAt": "2022-10-24T05:20:26.575Z",
        "createdAt": "2022-10-24T05:20:26.575Z"
    }
}


```
### Delete data barang

Request:

	- Method : Delete
	- Endpoint : `api/admin/product/delete/:id`
	
Response :

```
json
	{
	  "status": "ok",
	  "message": "success"
	}
```

### Tambah Category

Request:

	- Method : POST
	- Endpoint : `api/admin/category/add`
header :
	
	- Authorization : Bearer Token
	
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
### Update category

Request:

	- Method : PUT
	- Endpoint : `api/admin/category/update`
header :
	
	- Authorization : Bearer Token
	
Body :
  
```
json
	{
		"nama"   : "abc"
	}
```


Response :
  
```
json
	{
	  "status": "ok",
	  "message": "success"
	}
```
### Delete data Category


Request:

	- Method : Delete
	- Endpoint : `api/admin/category/update/:id`
	
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
