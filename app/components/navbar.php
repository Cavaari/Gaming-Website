<nav class="d-flex sticky-top">
    <style>
        <?php include 'css/navbar.css'; ?>
    </style>


    <!-- draw shapes -->
    <div id="nav-rect" class="bg-first">
        <div id="nav-tri"></div>
    </div>
    <!-- draw shapes + nav content -->
    <div id="nav-content" class="bg-second d-flex align-items-center">
        <a class="new-nav-link me-5" href="/"><i class="bi bi-house-door-fill"></i></a>

        <a class="new-nav-link me-5 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="/aboutme">About Us</a>
        <ul class="dropdown-menu bg-second">
            <li><a class="dropdown-item new-nav-link" href="aboutme/edearing">Eric Dearing</a></li>
            <li><a class="dropdown-item new-nav-link" href="aboutme/eivanov">Eivanov</a></li>
            <li><a class="dropdown-item new-nav-link" href="aboutme/kgarment">Kgarment</a></li>
            <li><a class="dropdown-item new-nav-link" href="aboutme/kkehelba">Kkehelba</a></li>
        </ul>
    </div>
</nav>