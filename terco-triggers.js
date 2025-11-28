
// triggers for terco buttons
document.addEventListener('click', function(e){
  const t = e.target;
  if (t && t.matches('.btn-completar-terco')) {
    const pid = t.dataset.prayerId || t.getAttribute('data-prayer-id');
    if (pid) {
      salvarRegistroTerco(pid);
      alert('Registrado no calendário: ' + pid);
    }
  }
});
