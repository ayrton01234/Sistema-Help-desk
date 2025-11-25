// Dark mode global - Citiesoft
(function () {
    function applySavedTheme() {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const toggleBtn = document.getElementById("toggleTheme");

        // aplica tema salvo em TODAS as páginas
        applySavedTheme();

        // se a página tiver o botão, faz o toggle funcionar
        if (toggleBtn) {
            if (document.body.classList.contains("dark")) {
                toggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
            } else {
                toggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Modo Escuro</span>';
            }

            toggleBtn.addEventListener("click", function () {
                document.body.classList.toggle("dark");

                if (document.body.classList.contains("dark")) {
                    localStorage.setItem("theme", "dark");
                    toggleBtn.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
                } else {
                    localStorage.setItem("theme", "light");
                    toggleBtn.innerHTML = '<i class="fas fa-moon"></i><span>Modo Escuro</span>';
                }
            });
        }
    });
})();
