document.querySelectorAll('form[data-graded]').forEach(form => {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('fieldset')];
    let correct = 0;
    for (const field of fields) {
      const select = field.querySelector('select');
      const choices = [...field.querySelectorAll('input[type="checkbox"]')];
      const right = choices.length
        ? choices.every(input => input.checked === (input.value === '1'))
        : (select || field.querySelector('input:checked'))?.value === '1';
      correct += Number(right);
      field.classList.toggle('correct', right);
      field.classList.toggle('incorrect', !right);
    }
    form.querySelector('.result').textContent = form.dataset.graded === '1'
      ? 'Правильних відповідей ' + correct + ' із ' + fields.length + '. Оцінка ' + Math.round(correct * 12 / fields.length) + ' із 12.'
      : (correct ? 'Правильно!' : 'Переглянь пояснення й спробуй ще раз.');
  });
});
