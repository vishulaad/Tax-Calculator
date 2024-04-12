document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('resultModal');
    const closeButton = document.querySelector('.close');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const age = document.getElementById('age').value;
        const income = parseFloat(document.getElementById('income').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const deductions = parseFloat(document.getElementById('deductions').value);

        let error = false;

        if (!age) {
            showError('age', 'Age is mandatory');
            error = true;
        }

        if (isNaN(income) || income < 0) {
            showError('income', 'Invalid income value');
            error = true;
        }

        if (isNaN(extraIncome) || extraIncome < 0) {
            showError('extraIncome', 'Invalid extra income value');
            error = true;
        }

        if (isNaN(deductions) || deductions < 0) {
            showError('deductions', 'Invalid deductions value');
            error = true;
        }

        if (!error) {
            const totalIncome = income + extraIncome;
            const tax = calculateTax(age, totalIncome, deductions);
            const incomeAfterTax = totalIncome - tax;
            document.getElementById('result').innerHTML = `
                Total Income after Tax Deduction: ${incomeAfterTax.toFixed(2)} Lakhs
            `;
            modal.style.display = 'block';
        }
    });

    closeButton.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function showError(inputId, message) {
        const errorIcon = document.getElementById(inputId + 'Error');
        errorIcon.style.display = 'inline-block';
        errorIcon.title = message;
    }

    function calculateTax(age, income, deductions) {
        const threshold = 8; 
        const taxRates = {
            '<40': 0.3,
            '≥40 & <60': 0.4,
            '≥60': 0.1
        };

        const taxableIncome = Math.max(0, income + deductions - threshold);
        const taxRate = taxRates[age];
        const tax = taxableIncome * taxRate;
        return tax;
    }
});
