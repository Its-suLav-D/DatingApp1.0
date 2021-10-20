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

