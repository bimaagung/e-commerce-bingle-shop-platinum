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
- create file `access.log` and `errors.log` in folder `logs`

test each endpoint in postman

- open postman
- import file platinum-maju-jaya.postman_collection.json in postman
- import file platinum-maju-jaya.postman_environment.json in postman
- change environment to `Platinum Maju Jaya`
- choose folder Platinum Maju Jaya and run


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
Response success:

```json
	{
		"status" : "ok"
		"message": "success"
		"token"  : "nsajdkasjdbhqwuu&^&%^bhjasc"
	}
```
Response failed:
```json
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
  
```From data
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
  
```json
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
  
```json
		{
		  "status": "failed",
		  "message": "invalid otp code"
		}
```
response failed :
  
```json
		
		 {
		  "status": "failed",
		  "message": "password and confrim password not match"
		 }
		
```
response failed :
  
```json
		
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

```json
	{
		"idToken" : {
			      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlMWI5Zjg4Y2ZlMzE1MWRkZDI4NGE2MWJmOGNlY"
			    }
```
Response success:

```json
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

```json
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

```json
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

```json
	{
	  "newPassword": "123456789",
	  "confirmNewPassword": "123456789"
	}
```

Response :

```json
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

```json
	{
	  {
		  "newPassword": "password",
		  "confirmNewPassword": "password",
		  "otp_code": "512315"
}
	}
```

Response :

```json
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

```json
		{
		  "email": "newemail@mail.com",
		  "otp_code": "122351"
		}
```

Response :

```json
	{
	  "status": "ok",
	  "message": "success"
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
