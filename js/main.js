// Função para abrir/fechar o menu no desktop
function toggleMenu() {
    const menu = document.querySelector('nav ul');
    menu.classList.toggle('active');
  }
  
  // Gerenciamento do dropdown no desktop
  const dropdownBtn = document.querySelector('.dropbtn');
  
  dropdownBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const dropdown = this.parentElement; // Obtém o pai do botão dropdown (li)
  
    // Verifica se o dropdown já está ativo
    const isActive = dropdown.classList.contains('active');
  
    // Fecha todos os dropdowns abertos antes de abrir o atual
    document.querySelectorAll('.dropdown').forEach(function (drop) {
      drop.classList.remove('active');
      drop.querySelector('.arrow-icon').style.transform = 'rotate(0deg)'; // Reseta a rotação
    });
  
    // Se o dropdown não estiver ativo, abre o atual e gira a seta
    if (!isActive) {
      dropdown.classList.add('active');
      dropdown.querySelector('.arrow-icon').style.transform = 'rotate(180deg)'; // Gira a seta
    }
  });
  
  // Fecha o dropdown se clicar fora dele (para desktop)
  document.addEventListener('click', function (e) {
    const dropdowns = document.querySelectorAll('.dropdown');
  
    dropdowns.forEach(function (dropdown) {
      // Se clicar fora do dropdown, ele fecha
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
        dropdown.querySelector('.arrow-icon').style.transform = 'rotate(0deg)'; // Reseta a rotação
      }
    });
  });
  
  // Menu Mobile
  document.addEventListener("DOMContentLoaded", function () {
    // Selecionar o menu mobile e ícones
    const mobileMenu = document.querySelector("nav.mobile");
    const closeIcon = document.querySelector(".close-icon");
    const menuIcon = document.querySelector("#menu-icon");  // Pegando o ícone do menu pelo ID
  
    // Abrir o menu mobile somente quando o ícone for clicado
    menuIcon.addEventListener("click", function (event) {
      event.stopPropagation();  // Previne que o clique afete outros elementos
      mobileMenu.style.display = "flex";  // Exibe o menu mobile
    });
  
    // Fechar o menu mobile ao clicar no ícone de fechar
    closeIcon.addEventListener("click", function () {
      mobileMenu.style.display = "none";  // Esconde o menu mobile
    });
  
    // Fechar o menu mobile ao clicar fora do menu
    document.addEventListener("click", function (e) {
      if (!mobileMenu.contains(e.target) && e.target !== menuIcon) {
        mobileMenu.style.display = "none";  // Fecha o menu se clicar fora dele
      }
    });
  
    // Gerenciamento do dropdown no menu mobile
    const dropdownMobile = document.querySelector("nav.mobile .dropdown");
    const dropdownBtnMobile = dropdownMobile.querySelector(".dropbtn");
    const dropdownContentMobile = dropdownMobile.querySelector(".dropdown-content");
    const arrowIconMobile = dropdownMobile.querySelector('.arrow-icon');
  
    // Toggle para abrir/fechar o dropdown no mobile
    dropdownBtnMobile.addEventListener("click", function (event) {
      event.preventDefault();  // Previne o comportamento padrão do link
      dropdownContentMobile.classList.toggle("active");  // Alterna a classe 'active'
  
      // Alterna a rotação da seta
      if (dropdownContentMobile.classList.contains('active')) {
        arrowIconMobile.style.transform = 'rotate(180deg)'; // Gira a seta
      } else {
        arrowIconMobile.style.transform = 'rotate(0deg)'; // Reseta a rotação
      }
    });
  });
