<nav class="d-flex sticky-top">
    <style>
        #nav-rect{
            position: sticky;
            width: 25%;
            height: 4rem;
        }

        #nav-tri{
            z-index: 1;
            width: 0;
            height: 0;
            border-left: 4rem solid transparent;
            border-right: 4rem solid transparent;
            border-top: 4rem solid var(--second-color);
            position: absolute;
            right: -4rem;
        }

        #nav-content{
            z-index: 2;
            width: 75%;
            height: 4rem;
        }

        .new-nav-link{
            text-align :center;
            text-decoration: none;
            font-size: 1.5rem;
            color: white;
        }
        .new-nav-link:hover{
            color: var(--first-color)
        }
    </style>


    <div id="nav-rect" class="bg-first">
        <div id="nav-tri"></div>
    </div>
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