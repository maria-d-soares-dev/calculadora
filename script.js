


/*
A palavra var cria uma variável.

Uma variável é um espaço identificado por um nome no qual podemos
guardar um valor para utilizar posteriormente.

Neste caso, a variável formulario guardará uma referência ao
formulário existente no HTML.

document representa o documento HTML carregado no navegador.

getElementById significa literalmente:
"obtenha um elemento pelo seu id".

O JavaScript procura no HTML um elemento que tenha:

id="formCalculadora"

O elemento encontrado é armazenado na variável formulario.
No nosso HTML, esse elemento é:

<form id="formCalculadora">
*/

var formulario = document.getElementById("formCalculadora");



/*
Procura no HTML o elemento com id="numero1".

O elemento encontrado é o primeiro <input> da calculadora:

<input id="numero1">

A variável campoNumero1 não guarda o número digitado diretamente.
Ela guarda uma referência ao elemento HTML inteiro.
*/
var campoNumero1 = document.getElementById("numero1");

/*
Procura o elemento com id="numero2" e guarda uma referência
a esse elemento na variável campoNumero2.
*/
var campoNumero2 = document.getElementById("numero2");

/*
Procura o elemento com id="operacao".

No HTML, esse elemento é o <select> que contém as opções
de soma, subtração, multiplicação e divisão.
*/
var campoOperacao = document.getElementById("operacao");


/*
Procura a área do HTML que possui id="resultado".

É nessa <div> que o JavaScript mostrará:
- o resultado da operação;
- ou uma mensagem de erro.

A variável guarda uma referência à <div>, e não apenas ao texto
que está dentro dela.
*/
var areaResultado = document.getElementById("resultado");




/*
addEventListener permite que o JavaScript fique atento a um evento.

Neste caso, queremos observar o formulário guardado
na variável formulario.

"submit" é o evento de envio do formulário.

Esse evento acontece quando:
- o usuário clica no botão type="submit";
- ou pressiona Enter enquanto está em um campo do formulário.

Quando o evento acontecer, a função escrita logo depois será executada.
*/
formulario.addEventListener("submit", function (evento) {

    /*
    O navegador normalmente tenta enviar o formulário e recarregar
    a página quando ocorre o evento submit.

    preventDefault significa "impeça o comportamento padrão".

    Portanto, esta linha impede que a página seja recarregada.
    Assim, o JavaScript consegue calcular e mostrar o resultado
    na própria página.
    */
    evento.preventDefault();


    /*
   campoNumero1 contém uma referência ao primeiro input.

   .value acessa o valor atualmente digitado nesse input.

   Mesmo com type="number" no HTML, o valor de um input chega
   ao JavaScript como texto.

   Por exemplo, se a pessoa digitou 10:

   campoNumero1.value

   produzirá algo equivalente a:

   "10"

   Number() converte esse texto para um número de verdade:

   Number("10")

   produz:

   10

   O número convertido é guardado na variável numero1.
   */
    var numero1 = Number(campoNumero1.value);

    /*
    Faz a mesma operação com o segundo campo:

    1. acessa o conteúdo por meio de .value;
    2. converte o conteúdo para número com Number();
    3. guarda o número na variável numero2.
    */
    var numero2 = Number(campoNumero2.value);

    /*
    Acessa o valor da opção selecionada no <select>.

    No HTML, cada opção possui um value:

    <option value="soma">
    <option value="subtracao">
    <option value="multiplicacao">
    <option value="divisao">

    Se a pessoa selecionar "Multiplicação (×)", por exemplo,
    campoOperacao.value será a string "multiplicacao".

    Esse valor é guardado na variável operacao.
    */
    var operacao = campoOperacao.value;


    /*
   Chama a função limparEstiloResultado(), que foi criada
   mais abaixo no código.

   Ela remove as classes visuais de sucesso e erro que possam
   ter sido adicionadas em um cálculo anterior.

   Isso é necessário porque a pessoa pode:
   - primeiro tentar dividir por zero, gerando um erro vermelho;
   - depois realizar uma conta válida, que deve ficar verde.
   */
    limparEstiloResultado();


    /*
    if significa "se".

    O código entre as chaves será executado somente se
    a condição entre parênteses for verdadeira.

    Aqui há duas condições:

    operacao === "divisao"
    verifica se a operação selecionada é divisão.

    numero2 === 0
    verifica se o segundo número é exatamente zero.

    && significa "E".

    Então, a condição completa significa:

    "Se a operação for divisão E o segundo número for zero..."
    */
    if (operacao === "divisao" && numero2 === 0) {

        /*
        Chama a função mostrarErro().

        A mensagem escrita entre aspas é enviada para a função
        por meio do parâmetro chamado mensagem.
        */
        mostrarErro("Não é possível realizar uma divisão por zero.");

        /*
        return encerra imediatamente a execução da função atual.

        Isso impede que o restante do código tente calcular
        numero1 / 0 ou mostrar um resultado normal.

        Sem este return, o programa continuaria executando
        as linhas que aparecem depois do if.
        */
        return;
    }


    /*
   Chama a função calcular() e entrega três informações:

   - numero1;
   - numero2;
   - operacao.

   A função realiza a operação apropriada e devolve o valor calculado.

   O valor devolvido é guardado na variável resultado.

   Exemplo:

   calcular(10, 2, "multiplicacao")

   devolve:

   20
   */
    var resultado = calcular(numero1, numero2, operacao);

    /*
    Chama a função obterSimbolo() e entrega o nome da operação.

    A função converte o nome usado internamente pelo programa
    em um símbolo visual.

    Por exemplo:

    obterSimbolo("multiplicacao")

    devolve:

    "×"

    O símbolo recebido é guardado na variável simbolo.
    */
    var simbolo = obterSimbolo(operacao);

    /*
    Chama a função que exibirá a conta completa na página.

    São enviados quatro argumentos:

    - primeiro número;
    - segundo número;
    - símbolo da operação;
    - resultado.

    Exemplo:

    mostrarResultado(10, 2, "×", 20)

    mostrará:

    10 × 2 = 20
    */
    mostrarResultado(numero1, numero2, simbolo, resultado);
    /*
Fecha a função associada ao evento submit.

Depois, o parêntese fecha o addEventListener.
O ponto e vírgula encerra a instrução.
*/
});


/*
Declara uma função chamada calcular.

Uma função é um bloco de código que realiza uma tarefa específica.
Ela só é executada quando é chamada.

Esta função possui três parâmetros:

numero1:
receberá o primeiro número.

numero2:
receberá o segundo número.

operacao:
receberá o nome da operação selecionada.

Os parâmetros funcionam como variáveis internas da função.
*/
function calcular(numero1, numero2, operacao) {

    /*
   === é o operador de igualdade estrita.

   Ele compara o valor e também o tipo do dado.

   Esta condição pergunta:
   "A operação é exatamente igual ao texto 'soma'?"
   */
    if (operacao === "soma") {

        /*
       Soma os dois números.

       return devolve o resultado para o local no qual
       a função calcular() foi chamada.

       Depois do return, a função é encerrada.
       */
        return numero1 + numero2;
    }

    if (operacao === "subtracao") {
        return numero1 - numero2;
    }

    if (operacao === "multiplicacao") {
        return numero1 * numero2;
    }

    if (operacao === "divisao") {
        return numero1 / numero2;
    }
}


/*
Declara a função obterSimbolo.

Ela recebe o nome interno da operação e devolve
o símbolo que será mostrado visualmente.

Essa separação é importante porque o programa usa palavras
como "multiplicacao", enquanto o usuário deve ver "×".
*/
function obterSimbolo(operacao) {

    /*
    Se a operação for soma, devolve o caractere +.
    */
    if (operacao === "soma") {
        return "+";
    }

    if (operacao === "subtracao") {
        return "−";
    }

    if (operacao === "multiplicacao") {
        return "×";
    }

    if (operacao === "divisao") {
        return "÷";
    }
}


/*
Declara uma função responsável por mostrar o resultado.

Ela recebe quatro parâmetros:

numero1:
primeiro número da conta.

numero2:
segundo número da conta.

simbolo:
símbolo visual da operação.

resultado:
valor calculado.
*/
function mostrarResultado(numero1, numero2, simbolo, resultado) {



    /*
    areaResultado contém uma referência à <div id="resultado">.

    textContent representa o conteúdo de texto de um elemento.

    Ao atribuir um novo valor a textContent, substituímos
    o texto que estava anteriormente dentro da <div>.

    O operador + tem duas funções possíveis em JavaScript:
    - somar números;
    - juntar textos.

    Nesta parte, ele está juntando os valores e os espaços.

    Se tivermos:
    numero1 = 10
    simbolo = "×"
    numero2 = 2
    resultado = 20

    A expressão formará:

    "10 × 2 = 20"

    Os textos " " representam espaços em branco.
    */
    areaResultado.textContent =
        numero1 + " " +
        simbolo + " " +
        numero2 + " = " +
        resultado;


    /*
    classList representa a lista de classes CSS do elemento.

    add() adiciona uma classe sem apagar as classes existentes.

    Portanto, resultado-sucesso é adicionada à área de resultado.

    Antes:
    class="resultado mt-4"

    Depois:
    class="resultado mt-4 resultado-sucesso"

    O CSS da classe resultado-sucesso deixa a área verde.
    */
    areaResultado.classList.add("resultado-sucesso");
}

/*
Declara uma função responsável por exibir mensagens de erro.

O parâmetro mensagem receberá o texto enviado quando
esta função for chamada.
*/
function mostrarErro(mensagem) {

    /*
   Substitui o conteúdo da área de resultado pela mensagem
   recebida pela função.

   Neste programa, a mensagem será:

   "Não é possível realizar uma divisão por zero."
   */
    areaResultado.textContent = mensagem;

    /*
    Adiciona a classe resultado-erro à área de resultado.

    Essa classe está definida no CSS e aplica:
    - borda vermelha;
    - texto vermelho;
    - fundo vermelho-claro.
    */
    areaResultado.classList.add("resultado-erro");
}

/*
Declara uma função que remove os estilos de cálculos anteriores.

Ela é chamada antes de verificar e exibir cada novo resultado.
*/
function limparEstiloResultado() {

    /*
    classList.remove() remove uma ou mais classes de um elemento.

    Aqui, removemos:
    - resultado-sucesso;
    - resultado-erro.

    Só as classes indicadas são removidas.

    As classes originais "resultado" e "mt-4" permanecem,
    pois não foram passadas para remove().
    */
    areaResultado.classList.remove(
        "resultado-sucesso",
        "resultado-erro"
    );
}