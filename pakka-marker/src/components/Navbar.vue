<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<style scoped>


.navbar {
    height: 60px;
    width: 95vw;
    margin: 0 auto;
    margin-top: 35px;
    padding-left: 1em;
    padding-right: 1em;
    box-sizing: border-box;
    display: block;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.15),
        0px 10px 10px rgba(0, 0, 0, 0.1);
    border-radius: 9px;
    position: relative;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
}
</style>