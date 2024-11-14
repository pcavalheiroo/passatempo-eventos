document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
        let alert = document.querySelector(seletor);
        alert.innerHTML = innerHTML;
        alert.classList.add(...classesToAdd);
        alert.classList.remove(...classesToRemove);
        setTimeout(() => {
            alert.classList.remove(...classesToAdd);
            alert.classList.add(...classesToRemove);
        }, timeout);
    }

    if (!email || !password) {
        exibirAlerta('.alert', 'Preencha todos os campos!', ['alert-warning','show'], ['d-none'], 2000);
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            exibirAlerta('.alert', 'Login realizado com sucesso!', ['alert-success','show'], ['d-none'], 2000);
        } else {
            exibirAlerta('.alert', 'Não foi possível realizar o login!', ['alert-error' ,'show'], ['d-none'], 2000);
        }
    } catch (e) {
        console.error(e);
        exibirAlerta('.alert', 'Erro ao tentar se conectar. Tente novamente mais tarde.', ['alert-error','show'], ['d-none'], 2000);
    }
});
