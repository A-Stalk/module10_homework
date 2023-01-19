const btn = document.querySelector(`.btn`);
btn.addEventListener(`click`, () => {
  alert(
    `Ширина окна: ${window.innerWidth}, высота окна: ${window.innerHeight}`
  );
});
