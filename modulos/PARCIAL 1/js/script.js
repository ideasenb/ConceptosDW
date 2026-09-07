const expensesList = document.getElementById('expensesList');
      const addExpenseButton = document.getElementById('addExpenseButton');
      const saveConfigurationButton = document.getElementById('saveConfigurationButton');
      const formMessage = document.getElementById('formMessage');
      const dashboard = document.getElementById('dashboard');
      const dailyExpenseForm = document.getElementById('dailyExpenseForm');
      const dailyExpensesList = document.getElementById('dailyExpensesList');
      const emptyDailyState = document.getElementById('emptyDailyState');
      const STORAGE_KEY = 'finanzas-app-data';
      let dailyExpenses = [];
      let initialBalance = 0;

      const getExpensesFromForm = () => [...expensesList.querySelectorAll('.expense-row')].map((row) => ({
        name: row.querySelector('.expense-name').value.trim(),
        total: Number(row.querySelector('.expense-total').value),
        isShared: row.querySelector('.expense-is-shared').checked,
        method: row.querySelector('.shared-method').value,
        sharedValue: Number(row.querySelector('.shared-value').value) || 0
      }));

      const saveData = () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          income: Number(document.getElementById('monthlyIncome').value) || 0,
          expenses: getExpensesFromForm(),
          dailyExpenses
        }));
      };

      const createExpenseRow = (expense = {}) => {
        const row = document.createElement('div');
        row.className = 'expense-row';
        row.innerHTML = `
          <div class="field-group">
            <label>Nombre del gasto</label>
            <input type="text" class="expense-name" placeholder="Ej. Arriendo" required>
          </div>
          <div class="field-group">
            <label>Valor total</label>
            <div class="input-with-prefix"><span>$</span><input type="number" class="expense-total" min="0" step="1000" placeholder="0" required></div>
          </div>
          <label class="shared-switch">
            <input type="checkbox" class="expense-is-shared">
            <span>¿Es compartido?</span>
          </label>
          <div class="shared-options" hidden>
            <div class="shared-mode">
              <label>Calcular aporte por</label>
              <select class="shared-method">
                <option value="percentage">% de aporte personal</option>
                <option value="people">Cantidad de personas</option>
              </select>
            </div>
            <div class="field-group">
              <label class="shared-value-label">Aporte personal (%)</label>
              <div class="input-with-suffix"><input type="number" class="shared-value" min="1" max="100" step="1" placeholder="50"><span class="shared-value-suffix">%</span></div>
            </div>
          </div>
          <button type="button" class="remove-button" aria-label="Quitar gasto" title="Quitar gasto">&times;</button>`;
        expensesList.appendChild(row);
        row.querySelector('.expense-name').value = expense.name || '';
        row.querySelector('.expense-total').value = expense.total || '';
        row.querySelector('.expense-is-shared').checked = Boolean(expense.isShared);
        row.querySelector('.shared-method').value = expense.method || 'percentage';
        row.querySelector('.shared-value').value = expense.sharedValue || '';
        updateSharedFields(row);
        updateSharedMethod(row);
      };

      const formatCurrency = (value) => value.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
      });

      const renderDailyExpenses = () => {
        dailyExpensesList.querySelectorAll('.daily-expense-item').forEach((item) => item.remove());
        emptyDailyState.hidden = dailyExpenses.length > 0;
        dailyExpenses.forEach((expense) => {
          const item = document.createElement('div');
          item.className = 'daily-expense-item';
          item.innerHTML = `
            <div>
              <strong>${expense.concept}</strong>
              <span class="category-badge">${expense.category}</span>
            </div>
            <strong>${formatCurrency(expense.amount)}</strong>
            <button type="button" class="delete-daily-button" data-id="${expense.id}" aria-label="Eliminar ${expense.concept}" title="Eliminar gasto">&times;</button>`;
          dailyExpensesList.appendChild(item);
        });
        const variableTotal = dailyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        document.getElementById('variableExpensesCard').textContent = formatCurrency(variableTotal);
        document.getElementById('balanceCard').textContent = formatCurrency(initialBalance - variableTotal);
      };

      const updateSharedFields = (row) => {
        const isShared = row.querySelector('.expense-is-shared').checked;
        row.querySelector('.shared-options').hidden = !isShared;
      };

      const updateSharedMethod = (row) => {
        const isPercentage = row.querySelector('.shared-method').value === 'percentage';
        row.querySelector('.shared-value-label').textContent = isPercentage ? 'Aporte personal (%)' : 'Personas con quienes se divide';
        row.querySelector('.shared-value').max = isPercentage ? '100' : '';
        row.querySelector('.shared-value').placeholder = isPercentage ? '50' : '1';
        row.querySelector('.shared-value-suffix').textContent = isPercentage ? '%' : 'personas';
      };

      addExpenseButton.addEventListener('click', createExpenseRow);

      expensesList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-button')) {
          const rows = expensesList.querySelectorAll('.expense-row');
          if (rows.length > 1) event.target.closest('.expense-row').remove();
        }
      });

      expensesList.addEventListener('change', (event) => {
        const row = event.target.closest('.expense-row');
        if (event.target.classList.contains('expense-is-shared')) updateSharedFields(row);
        if (event.target.classList.contains('shared-method')) updateSharedMethod(row);
        saveData();
      });

      document.querySelector('.setup-panel').addEventListener('input', saveData);

      saveConfigurationButton.addEventListener('click', () => {
        const income = Number(document.getElementById('monthlyIncome').value);
        const expenses = getExpensesFromForm();

        if (!income || expenses.some((expense) => !expense.name || expense.total <= 0 || (expense.isShared && (!expense.sharedValue || (expense.method === 'percentage' && expense.sharedValue > 100))))) {
          formMessage.textContent = 'Completa los campos y verifica los datos del gasto compartido.';
          formMessage.className = 'form-message error-message';
          return;
        }

        const calculatedExpenses = expenses.map((expense) => {
          if (!expense.isShared) return { ...expense, payable: expense.total };
          const payable = expense.method === 'percentage'
            ? expense.total * expense.sharedValue / 100
            : expense.total / (expense.sharedValue + 1);
          return { ...expense, payable };
        });
        const totalExpenses = calculatedExpenses.reduce((sum, expense) => sum + expense.payable, 0);
        const balance = income - totalExpenses;
        document.getElementById('incomeCard').textContent = formatCurrency(income);
        document.getElementById('expensesCard').textContent = formatCurrency(totalExpenses);
        document.getElementById('balanceCard').textContent = formatCurrency(balance);
        document.getElementById('dashboardSummary').textContent = `${expenses.length} gasto${expenses.length === 1 ? '' : 's'} registrado${expenses.length === 1 ? '' : 's'}`;
        initialBalance = balance;
        renderDailyExpenses();
        saveData();
        dashboard.hidden = false;
        formMessage.textContent = 'Configuración guardada correctamente.';
        formMessage.className = 'form-message success-message';
        dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });

      dailyExpenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const concept = document.getElementById('dailyConcept').value.trim();
        const amount = Number(document.getElementById('dailyAmount').value);
        const category = document.getElementById('dailyCategory').value;
        if (!concept || amount <= 0) return;
        dailyExpenses.push({ id: Date.now(), concept, amount, category });
        dailyExpenseForm.reset();
        document.getElementById('dailyMessage').textContent = 'Gasto diario agregado.';
        document.getElementById('dailyMessage').className = 'form-message success-message';
        renderDailyExpenses();
        saveData();
      });

      dailyExpensesList.addEventListener('click', (event) => {
        const deleteButton = event.target.closest('.delete-daily-button');
        if (!deleteButton) return;
        dailyExpenses = dailyExpenses.filter((expense) => expense.id !== Number(deleteButton.dataset.id));
        renderDailyExpenses();
        saveData();
      });

      document.getElementById('restoreButton').addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        window.location.reload();
      });

      const storedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (storedData) {
        document.getElementById('monthlyIncome').value = storedData.income || '';
        if (storedData.expenses?.length) {
          expensesList.innerHTML = '';
          storedData.expenses.forEach(createExpenseRow);
        }
        dailyExpenses = Array.isArray(storedData.dailyExpenses) ? storedData.dailyExpenses : [];
        saveConfigurationButton.click();
      }