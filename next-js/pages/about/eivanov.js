import Image from "next/image"

export default function About() {
    return (
        <>
            <div class="mt-5 container">

                <div style="background-color: #E7EDE8;" class="h-100 text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <Image fill="true" class="img-fluid m-3 rounded" style="max-height: 400px;" src="/about/egor.jpg" alt="Picture of Egor Ivanov"/>
                        <h1 class="mb-3 fw-bold">Egor Ivanov</h1>
                        <span class="mb-3">Software Engineering <br /><i>5th Year</i></span>
                </div>

                <div style="background-color: #E7EDE8;" data-aos="fade-right" class="h-100 text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <span data-aos="zoom-in" data-aos-duration="3000" class="m-3 fs-4">Part-Time Full-stack Web Developer at <a href="ei2i.com">ei2i</a></span>
                    <span data-aos="zoom-out" data-aos-duration="3000" class="m-3 fs-4">Delevoper of <a href="https://ei2i.com/editor">Digital Business Card Editor</a> made with Next.js</span>
                </div>

                <div style="background-color: #E7EDE8;" data-aos="fade-left" class="h-100 text-center card shadow d-flex align-items-center justify-content-center mb-3">
                    <span data-aos="zoom-out" data-aos-duration="3000" class="mb-5 fs-1">Favourite Web Dev Tools</span>
                    <div class="d-none d-lg-flex align-items-center justify-content-center">
                        <Image fill="true" data-aos="zoom-out-right" data-aos-duration="3000" class="img-fluid m-2" style="max-height: 145px;" src="https://testrigor.com/wp-content/uploads/2023/04/nextjs-logo-square.png" alt=""/>
                            <Image fill="true" data-aos="zoom-out-up" data-aos-duration="3000" class="img-fluid m-2" style="max-height: 145px;" src="https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png" alt=""/>
                                <Image fill="true" data-aos="zoom-out-up" data-aos-duration="3000" class="img-fluid m-2" style="max-height: 145px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8Ol0gAlEFzuIoAjjEAlUQAkToAkDYAjzMAjS4Akz4AkTn6/fvs9e/L49Py+PQlnFNZrXaAvpTe7eOq0rfF4M7l8elOqW7X6t09o2Iwn1qkz7J4uo4onVW+3MhSq3GPxaBksn6y1r2Ux6U5omBgsHyIwZqm0LO6RLh9AAAHp0lEQVR4nO2d2XajOhBFLRkxCPAQz3bieIid///Da990p21DgVRISMViv/RTE50FOugIuWow6Onp6enp6enp0SSbrWeZ60FYZP4VRFEUfM1dD8QSexEKduf27971YCww20TsH9Fm5npAhhkPE8EeEclw7HpQJtlFnL3Co53rYRljwcKCvjshW7gemhGWq1iUCrw9qvFq6Xp4jcneEkjfz3R8I/56/E5lhb47Mv12PcgGjCZpjb476WTkeqBI8ik4AV+n4zR3PVgM16T4hoDgydX1cLU5yboJ+IyUJ9dD1mK9jepFvRBt166Hrcz4GKhNwGdEcCSykDsH6hPwGR6cXQ9egVtGQuq743+ues5IGPzOVdlrRsJwy1XeLuTKMhIGX3MVlJEw+JirKjISBu9yVU1GQmn0KlfNQ70lmhoy9GXXcfShkpEwpB8+5Kp8ilqiqSEC97nqoJGRMPDk4FTfiduYgM9I7i5Xrb+aLtHUiL7c5CpkRsLgJledY7sT8Bket52r9gaXaGqErM1cdctIbT2g/xDt5ars3fgSTVFj8t7KQm4X2X9DQMgWctVi0vYEfCac2M1Vy0+jGQmDiD8t5irzGQnDLVdZ0mcnI2Gwk6vWW1sZCUNqfIM8v7S2RFNDBBejueqA3sa2Bw8OxvS1kZEwmMpVbWUkDCZyVeGoj180P3jUbkbC0CxXtZ+RMDTIVUfnSzQ1RHzECdz46aBlyA3qDtIReJOIuIuLwPWotQj0Q9WWxhz8i9jqCpzRuoW3m6i7ifNN4T3xSKh7APDN9zf9K1w3Fg8RCrlMwzCUDScwv19D/6/zoW2FIhLD3Wm/n19XUYp+AETE3ub7/e4Y6c4S6wrjz4ePmaNhjHuZhttf09+les+CZYVCvryOsitmTyB+PIM51ltT2VUoWDHC5BttN45ftntXOmOwqzAszWhvmslZFsao8xhYVRgB6eWgJ5EXLrDQuIBNhfCCaajzoMqSTxIaS0ebCiu2ZzcaT0JQ8qhrrKxsKozg7wgZU74J4qPk/8/UH1ObCuOKj3pL5SHysoSXxV4oDKquM0oajVA94ThTONgp3ga6Cgfvam5BWKHi0oSywoGSoZJWmKsYKmmFSoZKW+FgXm+oxBUqGCp1hfWGSl7hYFJjqPQV1hkqfYV1htoBhTWG2gWFg7cqQ+2EwkpD7YbCKkPtiMIcPhvXEYWDNWio5BRCx+pOkKGSU3iBPslChkpO4VBCO3Cf5VempzAEj7iUGyo9hbz4oeUP41JDJaiQRdCRulJDpaiQJdApnlPJwEkqZAH0ReNafFBpKhQCMtRp4Qs2TYWMf0HX/3g1VKIK4TOD49cXP1WF6oZKViFLoCPKL4ZKVyF8aPDZUAkrFFzJUAkrZAI01MejFpQVVhjqw00krRA21Nk/Q6WtEDbU/a8E4gphQz38NVTqCgWHfoB1kd1QWHH47Y+hklfI5AX4S2MuuqGQpQfgT/38tKMDClkAGmrSEYUsgQz1HHVEIZOQoR5lRxRWGWo3FDI5Bf5cBmyvklNYYahJRxSyACoSsC99XxJUyBKoRkBpiUSKCoGfnwCQVFh6KL9TCmFD7YxClqq3CSCqEDbUziiEDbUzCpUNla5CMem6QiY/u66QpUq/n6eskMUqhkpaoZKh0lbI0vqacsQVKhgqcYWM1xoqdYUsrDNU8gpZXFOmk75CllR3P+iAwhpD9VjhUfX/VxuqHwpLKw5slEsN8BU8ityP3+OHJcuvTKNUWPgOjmLvR9UIUbLvctKp+QEb6tSPyh9lH+n16tlBR211isZZVSgKh9Z3mnWjgbMahSOarhQWliZr7YJ9Qdn2W/GYrTOFLHoyi4W6A/4iC/XyvaqEdS9D9hv2sndUyUURbU8PR/yys2YLDdsKmYg33+s8n+2H6MrDIoxX5/0sz5fr+VG74Jt1hfcBRnEchVh9P9eQ/18EcxVthe+NRuoADq8byjlTqrF7R0LnHyFG/hZiLyfSbkJHq8jubQrrChx8+9TOoh5MD3pSpZL1CyUP7r9qoSNRaB0O+CVnVPxUMmy/Ej96A9XRqHeQB/2d6mjc/8l1j646TPTwMtWL2gaG+ls765VXh8Fees17wtvAbD9E//qxmO9p6VdPHSt9SVvsHVuHtd6y660f09Fmf2Af+pPZ7vF8ddxjjpfurBolnzpcyLXUa3304SocpxPtrQok89TFdLTTmxMgaz9X3TJSK+2Of1muWp2OIl5Z7JELsGhxIRcyu32OIdrKVYYyEoasjQaXIhm2OwGfsZ+r2usZD7EXNqdjKExnJAxnaws5HljISBgs5SprGQmDjVwVGW+93YyTNLuQk9JuRsJgMle1kJEwGMtVIm4lI2EYTUzkqvYyEobvxrlKYr51tknDDfLWMxKGBrnKSUbCgM1V5rex7YHZIOdgRTAvGevmqltG8meJpsZaK1e5z0gY1HOVHxkJw0FpIceDg+uB4hlfanOVCC6+LtHUWG+rF3KpZxkJwymEF3Ky7NcoBLkCbw6eeJmRMCw/S6ajCBoe9fGLUeHgUeh1RsKwe8pVMnW2jW2PW676+3bk5o76+MXsGERhGEbBsUsT8JlsNN/NR928fz09PT09PT09PU34D3vxmsiliIlyAAAAAElFTkSuQmCC" alt=""/>
                                    <Image fill="true" data-aos="zoom-out-left" data-aos-duration="3000" class="img-fluid m-2" style="max-height: 145px;" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/640px-Bootstrap_logo.svg.png" alt=""/>
                                    </div>
                                    <div id="carouselExampleIndicators" class="d-lg-none carousel slide" style="height: 250px;width: 250px;">
                                        <div class="carousel-indicators bg-dark">
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                                        </div>
                                        <div class="carousel-inner">
                                            <div class="carousel-item active">
                                                <Image fill="true" src="https://testrigor.com/wp-content/uploads/2023/04/nextjs-logo-square.png" class="d-block w-100" alt="..."/>
                                            </div>
                                            <div class="carousel-item">
                                                <Image fill="true" src="https://d1.awsstatic.com/asset-repository/products/amazon-rds/1024px-MySQL.ff87215b43fd7292af172e2a5d9b844217262571.png" class="d-block w-100" alt="..."/>
                                            </div>
                                            <div class="carousel-item">
                                                <Image fill="true" src="data:image/png;base64,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" class="d-block w-100" alt="..."/>
                                            </div>
                                            <div class="carousel-item">
                                                <Image fill="true" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/640px-Bootstrap_logo.svg.png" class="d-block w-100" alt="..."/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                        )
}
