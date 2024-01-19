<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Home</title>
        <link rel="stylesheet" href="static/bootstrap.min.css">
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="#">Home</a>
					</li>
					<li class="nav-item dropdown">
					<button class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						About Me
					</button>
						<ul class="dropdown-menu">
							<li><a class="dropdown-item" href="aboutme/edearing/index.html">Eric Dearing</a></li>
							<li><a class="dropdown-item" href="aboutme/eivanov/index.html">Eivanov</a></li>
							<li><a class="dropdown-item" href="aboutme/kgarment/index.html">Kgarment</a></li>
                            <li><a class="dropdown-item" href="aboutme/kkehelba/index.html">Kkehelba</a></li>
						</ul>
					</li>
				</ul>
            </div>
        </div>
        </nav>

        <div class="text-center mt-5">
            <h1 class="text-primary">CIS4250 - Team 9</h1>
        </div>
        
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card card-body">
                    <h2 class="mb-4">Login</h2>
                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" name="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" name="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>

		<script src="static/bootstrap.bundle.min.js"></script>
    </body>
</html>