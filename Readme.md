# Create a New Asp.NET CORE Project in Visual Studio Code

1. Create a Solution - dotnet new sln

   > A solution is a container to place all of our stuff, it will take the Folder name that it resides on. For Example DatingApp Folder takes the name as DatingApp.sln

2. Create WebApi - dotnet new webapi -o API

   > -o Creates a Directory called API inside the folder

3. Add the webapi into Solution dotnet sln add API

# Trust the Dotnet HTTPS Certification

Once we run the application dotnet runs in two different URLS http and https.
In ordet to use the HTTPS we need to Trust the certificate by using the command

```
dotnet dev-certs https --trust (Might Ask for Password on Mac [Sudo])
```

# Understand how the Application Works

1. When we execute dotnet watch run or dotnet run, it will start looking for the
   Static Main method that is inside the Program.cs file.

2. The Static Main method calls another File Called Static CreateHostBuilder that basically will setup Configuration for us like environment variables,where we get the files and all.Note \*\* It also points to the Startup.Cs File to start with those Configuration as well.

3. The Startup.Cs file we inject Configuration which is basically appsettings.json and appsettings.Development.json File. Note \*\* We can chaneg the Log level of Microsoft to Information in order to get useful information when we hit a particular endpoint.

4. We also have two more methods there ie. ConfigureServices and Congifure Method.

5. The Configure Services is also known as Dependency Injection Container. If we want to make a class or service availabe to other part of application we can add that in the Configure Services Method. Dotnet will take of Creation and destruction of those classes when no longer used.

6. The Configure Method is used to configure the HTTP request Pipeline. As we make our GET request from our Browser to our Controller End point, our request goes through the series of Middleware on the way in and also on the way out.

- At first it checkes whether we are on development mode or not.
- We use HTTPS redirection - we get redirected to HTTPS
- UseRouting
- Authorization
- Endpoints - Use the endpoints and Map the Controllers

# Create Entity

Our Application Needs User. A physical thing in our application is User, so we are going to make A Model for our User.

We need to Give the property Name (Id) so our Entity Knows it is the Primary Key

1. Conventions C#

- UserName
  protected (Access Modifier) --- Means this property can be accessed from the same class or any other class that inherits from it.

# Entity FrameWork

- An Object Relational Mapper(ORM)
- Job it to translate our Code into SQL commands that update our tables in the database
- When we use Entity Framework We need to create an important class that is derived from the DbContext class that we get with the Entity Framework. This class acts as a bridge between our Model and the Database. Moreover, dbcontext class is the primary class that we will use for interactint the database

DB Context allows us to write SQL code with LINQ Users that generates the sql Command

```
    DbContext.Users.Add(new User {Id=4, Name=John})
    Sqlite Provider
    INSERT INTO Users(Id,Name)
    VALUES(4,John)

```

### Benefits:

1. Querying
2. Change Tracking
3. Saving
4. Concurrency
5. Transactions
6. Caching
7. Buil-in conventions like Id
8. Configurations
9. Migrations

# Adding Entity to our Project

1. Microsoft.EntityFrameworkCore
2. Microsoft.EntityFrameworkCore.SqlLite
3. Microsoft.EntityFrameworkCore.SqlLite.Design and Entity FrameworkCore.Design
4. Create a Folder Data that will work in the Datas
5. Crate a class called DataContext or anything and inherit from DbContext because we want to convert out linq Queries to SQL Command. Note \*\* We need to import EntityFrameWork

6. We create a contrusctor with options
7. Create a DbSet Property whose type is going to the Model that we have, so that it will create table in database

```
public DbSet<AppUser> Users {get;set;}

``
```

Now, we need to add this configuration to the Startup class, in order to inject this service Data Context in our application.

# Create Connection String

1. Go to the App settings.json file and add a ConnectionStrings

```
{
    "ConnectionStrings": {
        "DefaultConnection": "Data source=datingapp.db"
    }
}

``
```

> SQL lite doesn't need any password or creditionial it basically needs Data with source=filname.db in order to gernerate the database

> The key ConnectionStrings needs to be plural because when we use the config.getConnectionString() method it looks for the ConnectionSrings Key.

# Install dotnet EF for Migrations

```
dotnet tool install --global dotnet-ef --version 5.0.11
```

1. Migrations will look on our models and create Datbase Schema.

2. Add Migration

```
dotnet ef migrations add InitialCreate -o Data/Migrations
```

3. Initial_Create file contains the Schema to create the Table

# Create Database

```
dotnet ef database update
```

Install SqlLite from Nuget Gallery

# Create API Controller

```
[ApiController] - This signifies that this classes is API  of type API Controller and add certain things
[Route("Controller")]
[Route("api/Controller")]
```

It needs to derive from the ControllerBase class

# Methods in Controller

1. GetAllUsers - We want to return the list of all users that we have stored in our database, so what we need to do is use List. C# has many list but we will use Ienumerable.

> It allows us to user simple Iteration of Collection Type - Ienumerable

```
public ActionResult<Ienumerable<AppUser>> GetUsers()
```

We can also List<AppUser> but since list offers like search, sort, and manipulate the list we don't need it right now. What we need is to get the Users. So we prefer to use the IEnumerable.

# Make it Asynchronous

# Walking Skeleton Part 2

## Learning Goals

1. Using the angular CLI
2. How to create a new Angular App
3. THe Angular Project Files
4. The Angular Bootstrap process
5. Using the Angular HTTP Client Service
6. Run Angular Application over HTTPS
7. Add Packages with NPM

### Create Angular

Install the Angular ClI (Command Line Interface)

```
npm install -g @angular/cli

## Create a new App

ng new DatingApp

cd DatingApp

ng serve

```

# Authentication Basics

> Learning Goals

1. How to store Passwords in Database
2. Using Inheritance in C# - DRY
3. Using the C# debugger
4. Using Data Transfer Objects (DTOs)
5. Validation
6. JSON web Tokens(JWTs)
7. Using services in C#
8. Middleware
9. Extension methods - DRY

# Hashing and Salting

Hashing the Password is not enough for the safe storage of the Password, we also need to Salt it

Salt - Scramble the Hash If two user uses the same weak password, it will have different Hashes, because of the SALT.

> dotnet ef migrations add UpdatePassword
> dotnet ef database update
> dotnet ef database drop

# Create a BaseApi Controller

Since we need to Inherite from the ControllerBase
and also include attributes like
[ApiController]
[Route("api/[controller]")]

in every controller that we create, we can basically create a Controller and inherit from there.

# Create an Account Controller (Register/Login)

[ApiController] = Indicates that a type and all derived types are used to serve HTTP API responses.

Controllers decorated with this attribute are configured with features and behavior targeted at improving the developer experience for building APIs.

The Api controller automatically binds the value that user passes from Web to the parameter that we have in our method.
For instance

```
# Should work fine when passed as a Query String
public async Task<ActionResult> Register(string username, string password)

```

> Note the parameter name should be same as we pass from the form.

If We are passing the data as a body we need to make that parameter accept an object

```
{
    username = "sulav"
    password = "letmein"
}

```

2. Since we have to Hash the password, we need to our Hashing Algorithm like HmacSha

```
## Instantiate the Hashing Algorithm

## The using statements is going to dispose correctly, once we are done instantiating the classs.

## Releases the Unmanaged Resources


using var hmac = new HMACSHA512();

```

3. Create a user after this using the Model we have

```
# The compute hash takes the password as bytes and return the byte array, so we need to encode it to bytes and store in our bytes[] passwordHash.

# Our password is string , we need to convert it to the Bytes Array.

var user = new AppUser {
    UserName = username,
    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password))
}

```

The HmacSha256 Class Initializes a new instance of the HMACSHA256 class with a randomly generated key.

We, can setup that key as our PasswordSalt

```

            using var hmac = new HMACSHA256();

            var user = new AppUser{
                UserName = username,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password)),
                PasswordSalt = hmac.Key
            };
             #   We are just tracking it , not adding it ot the database
            _context.Users.Add(user);

            await _context.SaveChangesAsync();
```

HMAC has overload if we pass SALT it checks

# Use Debugger

Start as .Net Core Attach and look for API.dll

# JSON WEB TOKEN

Industry Standard for tokens (RFC 7519)

Self-contained and can contain:

1. Credentials
2. Claims
3. Other Information

JWT are divded into three different section

- Header
  Header contains the Hashing Algorithm and type of JWT. Also the algorithm is used to encrypt the signature in the third part of the token.
- Payload: Data
  Contain information about our claims. Claim means a user is claiming to be something. We also get three time stamp inside the payload. NBF - can't be used before, EXP- Expire at, IAT - Token issued at

- Signature
  Verify the Signature

# How JWT Works

1. User Sends Username and password to our Server
2. Server validates and returns a JWT
3. Sends JWT with further request (By adding token in the Authentication Header)

4. The server that signed the token will have the access to the private key that is stored in the server and the server is able to verify that it is valid, without caling the database

5. Send verifies and return responses

# Add a Token Service

Create a service that is solely going to be respoinsible for the
creation of JWT Token

Its job is going to recieve a app user and send the Token to the Account's Controller

#### What is Interface ?

- Interface is like a contract between itself and class that implements it. Any class that uses the interface should use the properties, methods and events of that interface.

- Interface doesn't contain any implementation logic and just contains the signature of the functionality that interface provides

# Add the Token Service

In this Configure Services, we need to add the service that we just created.

Note \*\*\* We need to specify the lifetime of the service that it will last, after we started.

1. Singleton - Creats and doesn't stop until our application Stop
2. AddScoped - Scoped to the Lifetime of the HTTP request
3. AddTransient - Created and destroyed as soon as the method is finished.

AddScope<Interface, Service>

We use Interface because it is good for testing

# Add the Token Logic

We need a helper package --- System.IdentityModel.Token.Jwt

> SymmetricSecurityKey is a type of key where only one key is used to both Encrypt and Decrypt electronic signature. The same is used to sign the JWT token and make sure the signature is verified.

Create Tokens

1. We need to make a list of claim

2. Add Credentials by instantiating new SigningCredentials(key, algorithm)

3. Describe the Token by instantiating SecurityTokenDescriptor and create a object of
   {
   Subject, Expires, SigningCredentials
   }

4. Instantiate new JwtSecurityTokenHandler()

5. Create Tokend and Write the token

# Add it to the Accounts Controller

# Add Authentication MiddleWare

[Authorize]

Install Microsoft.AspNetCore.Authentication.JwtBearer

2. Add to the Service

```
   services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });


```

# Angular

[()] == This is called Two Way Binding and we use Square bracket to take the input. When we use submit it is through the () paranthesis.

--skip-tests

@Injectable decorater means, this service can be injected into any component

Services are singleton, It will still untill the app is closed

# Observables

New standard for managing async data

Lazy collections of multiple values over time

Watch for changes

You can think of observables like a newsletter

1. Only Subscribers of the newsletter recieve the newsletter

# Difference between Promises vs Observables

> Promise

1. Provides a singleton future value
2. Not lazy
3. Can not cancel

> Observable

1. Emits multiple values over time
2. Lazy
3. Able to cancel
4. Can use with map, filter, reduce and other operators

# Example of Observable with RxJS

```
getMembers(){
  return this.http.get('api/user').pipe(
    map(members)=> {
      console.log(member.id)
      return member.id
    }
  )
}

```

# Reply Subject

private currentUserSource = new ReplaySubject<User>();

It is like a buffer object, which will store the values inside here and any time user subscribes to this observable it will emit the last value inside it.

We can store as many previous value inside the Subjet by passing number in the parameter, for example (1) to store one previous value

# Routes in angular

We add routes as a object in the routes Array in the app.routing.module file. H

{path: '\*\*', component: , pathMatch:'full'} It is an wildcard route which means that if the user tries to navigate to route that is not specified, will redirect the user to the component that we specify.

# Angular Route Guard

ng g guard auth --skip-tests

When we run this command it will ask us to choose an option that we would like to implement

1. CanActivate - Check to see if we can activate this route or not
2. CanActivateChild
3. CanDeactivate
4. CanLoad

AuthGuard class will handle the subscription for us automatically, so we don't have to subscribe in any methods.

Once we create the Auth Guard, we just need to add in the routing.module, with a key canActivate and value as an array of [AuthGuard]

Lets say we want to implement canActivate Guard on all the Routes, instead of adding key on every, we can just do something like this to add the Guard

```
{
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent },
      { path: 'members/:id', component: MemberDetailComponent },
      { path: 'lists', component: ListsComponent },
      { path: 'messages', component: MessagesComponent },
    ],
  },

```

# Create a Shared Module

```
ng g m shared --flat (flat doesn't allow us to create a folder called Shared and inside that folder have a shared.ts file )
```

Every Angular Module needs commonModule

When we create a Shared module, we will have a imports array however, we would also have to export that module so that the app.module.ts Can use It

# Adding a MiddleWare in c#

1. Create a new class
2. When adding a midleware in dotnet net API we need a constructor also we need Request Delegate
3. RequestDelegate = Means What's coming in the piple Line

# Angular Error Interceptor

Angular Intercepator are used to handle the Global Errors in our Angular Application

1. Create a new Folder \_interceptors
2. Create interceptor with the command n g interceptor error --skip-tests
3. Now we just need to add the pipe method and catch for the error, and do that we need to
   do with the error. Fore example, redirect to page, or Show Toast or something.

4. We do need to return throwError(error) because it expects an error.

5. Finally, we need to add the interceptor to the provides array of the app.module.ts file with some configurations

```
provides: [
  {
    provide: HTTP_interceptors,
    useClass: ErrorInterceptor,
    multi: true (because we don't want to override the default interceptor)
  }
]
```

# Repository Pattern

A Repository mediates between the domain and data mapping layers, acting like an in memory domain object collection.

### What we are doing right now

We have a Web Server, rquest comes into our controller end point. Now in our controller we are injeting the DBContext(represents a session with our database) our Dbcontext converts our c# sql queries to perform the CRUD operation to our datbase.

### What we are going to do is

We are going to introduce a layer of Abstraction so instead of the controller going directly to the DB context, it uses the Repository and executes the method there.

The repository will use the DB context class to execute the Logic.

## The reason behind using the Repository Pattern is that we

1.Using Repository Pattern We Encapsulate the Logic

DBcontext Class might have folowing methods

I support:

Users.First()
Users.FirstOrDefault()
Users.SingleOrDefault()
Users.Include(x=> x.Thing).FirstOrDefault

- another 1000 Methods

Repository will help to flatten it

I support:
GerUser()
GerUsers()
UpdateUser()
SaveAll()

2. Reduce Duplicate Query Logic

UsersController:

```
var user = context.Users.Include(x=> x.Thing).FirstOrDefault(x=> x.UserName== username);
```

MessageController:

```
var user = context.Users.Include(x=> x.Thing).FirstOrDefault(x=> x.UserName== username);
```

LikesController:

```
var user = context.Users.Include(x=> x.Thing).FirstOrDefault(x=> x.UserName== username);
```

If we create a Repository something like this:

```
public User GetUser(string username){
  return context.Users.Include(x=> x.Thing).FirstOrDefault(x=> x.User.UserName== username)
}

// Users Contoller
var user = repo.GerUser(username)

// MessageController
var user = repo.GerUser(username)

// LikesController
var user = repo.GerUser(username)
```

3. Promotes Testatbility

# AutoMapper

It helps to map object from one object to another.

We need to derive this class from Profile

Add the AutoMapper with the help Assembly
// AutoMapperProfiles is a class name that We created on the Helper on the Helper Folder

```
services.AutoMapper(typeof(AutoMapperProfiles).Assembly)
```
