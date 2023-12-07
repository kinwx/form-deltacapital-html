// === Custom Select Actions ===
class SelectActions{
    constructor() {
        this.listInputSelect = document.querySelectorAll('[data-input-select]');
        this.listSelectOptions = document.querySelectorAll('[data-select-list]');
    };

    onFocus() {
        this.listInputSelect.forEach( (input, indexInput) => {
            input.addEventListener( 'focus' , (e) => {
                e.preventDefault();
                this.listSelectOptions.forEach( (listOptions, indexList) => {
                    if(indexInput == indexList) {
                        listOptions.style.display = 'flex';
                    };
                    const listButtons = [...listOptions.children];
                    listButtons.forEach( (button) => {
                        button.addEventListener( 'mousedown' , (e) => {
                            if(indexList == indexInput) {
                                input.value = e.target.value;
                                occasions();
                            };
                        });
                    });
                });
            });
        });
    };                

    onBlur() {
        this.listInputSelect.forEach( (input, indexInput) => {
            input.addEventListener( 'blur' , () => {
                this.listSelectOptions.forEach( (listOption, indexList) => {
                    if(indexInput == indexList) {
                        listOption.style.display = 'none';
                    };
                });
            });
        });
    };

    disableKeyboard() {
        this.listInputSelect.forEach( (input) => {
            input.addEventListener( 'keypress' , (e) => {
                e.preventDefault();
            });
        });
    };
    
    disableKeyboardMobile() {
        this.listInputSelect.forEach( (input) => {
            input.addEventListener( 'change' , (e) => {
                e.preventDefault();
                input.value = '';
            });
        });
    };
};

const select = new SelectActions();
select.onFocus();
select.onBlur();
select.disableKeyboard();
select.disableKeyboardMobile();


// select occasions
const who = document.querySelector('[data-occasional-who]');
const plate = document.querySelector('[data-occasional-plate]');
const motor = document.querySelector('[data-occasional-motor]');
const deadline = document.querySelector('[data-occasional-deadline]');
const profession = document.querySelector('[data-occasional-profession]');

const occasions = () => {
    if(document.querySelector('[data-input-who]').value == 'Cliente'){
        who.style.display = 'none';
        const inputs = document.querySelectorAll('[data-who-required]');
        inputs.forEach( element => element.removeAttribute('required'));
    } else {
        who.style.display = 'block';
        const inputs = document.querySelectorAll('[data-who-required]');
        inputs.forEach( element => element.setAttribute('required', true));
    }
    
    if(document.querySelector('[data-input-profession]').value == 'Outros Profissionais Liberais') {
        profession.style.display = 'flex';
        document.querySelector('[data-profession-required]').setAttribute('required', true);
    } else {
        profession.style.display = 'none';
        document.querySelector('[data-profession-required]').removeAttribute('required');
    }

    if(document.querySelector('[data-input-plate]').value == 'Veículo 0km'){
        plate.style.display = 'none';
        document.querySelector('[data-plate-required]').removeAttribute('required');
    } else {
        plate.style.display = 'block';
        document.querySelector('[data-plate-required]').setAttribute('required', true);
    }

    if(document.querySelector('[data-input-motor]').value == 'Outra Motorização'){
        motor.style.display = 'block';
        document.querySelector('[data-motor-required]').setAttribute('required', true);
    } else {
        motor.style.display = 'none';
        document.querySelector('[data-motor-required]').removeAttribute('required');
    }

    if(document.querySelector('[data-input-deadline]').value == 'Outro Prazo'){
        deadline.style.display = 'block';
        document.querySelector('[data-deadline-required]').setAttribute('required', true);
    } else {
        deadline.style.display = 'none';
        document.querySelector('[data-deadline-required]').removeAttribute('required');
    }
}


// === Radio Actions ===
class RadioOptions {
    constructor() {
        this.boxResponse = document.querySelector('[data-radio-response]');
    }

    openOptions(e) {
        const list = [...this.boxResponse.children];
        const geralInputsOccasions = document.querySelectorAll('[data-geral-required]');
        list.forEach( element => {
            element.style.display = 'none';
            geralInputsOccasions.forEach( input => input.removeAttribute('required'));
        })

        const title = document.querySelector('[data-handle-title]');
        const inputsManager = document.querySelectorAll('[data-manager-required]');

        const inputsPublicHired = document.querySelectorAll('[data-publicHired-required]');

        const inputsIndependent = document.querySelectorAll('[data-independent-required]');

        const inputsGraduate = document.querySelectorAll('[data-graduate-required]');

        switch(e.target.id){
            case 'manager':
                const manager = document.querySelector('[data-manager]');
                manager.style.display = 'flex';
                title.textContent = 'Dados do Sócio/Proponente';
                inputsManager.forEach( input => input.setAttribute('required', true));
                break;
            case 'hired':
                const publicHired = document.querySelector('[data-publicHired]');
                const titleHired = document.querySelector('[data-title-publicHired]');
                titleHired.textContent = 'Assalariado';
                publicHired.style.display = 'flex';
                title.textContent = 'Dados do(a) Proponente';
                inputsPublicHired.forEach( input => input.setAttribute('required', true));
                break;
            case 'public':
                const outher = document.querySelector('[data-publicHired]');
                const titlePublic = document.querySelector('[data-title-publicHired]');
                titlePublic.textContent = 'Funcionário(a) Público';
                outher.style.display = 'flex';
                title.textContent = 'Dados do(a) Proponente';
                inputsPublicHired.forEach( input => input.setAttribute('required', true));
                break;
            case 'independent':
                const independent = document.querySelector('[data-independent]');
                independent.style.display = 'flex';
                title.textContent = 'Dados do(a) Proponente';
                inputsIndependent.forEach( input => input.setAttribute('required', true));
                break;
            case 'graduate':
                const graduate = document.querySelector('[data-graduate]');
                graduate.style.display = 'flex';
                title.textContent = 'Dados do(a) Proponente';
                inputsGraduate.forEach( input => input.setAttribute('required', true));
                break;
            case 'retired':
                const retired = document.querySelector('[data-retired]');
                retired.style.display = 'flex';
                title.textContent = 'Dados do(a) Proponente';
                document.querySelector('[data-retired-required]').setAttribute('required', true);
                break;
        }
    }
}

const listRadio = document.querySelectorAll('input[name="professional"]');
const radio_options = new RadioOptions();
listRadio.forEach( (radio) => {
    radio.addEventListener( 'change', (e) => {
        radio_options.openOptions(e);
    });
})


// === Regex ===
const formatter = (type, value) => {
    const notFormat = value;

    switch(type) {
        case 'cpf':
            const formatCpf = notFormat.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');

            return formatCpf;
            break;
        case 'cnpj':
            const formatCnpj = notFormat.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1');

            return formatCnpj;
            break;
        case 'phone':
            const formatPhone = notFormat.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1');

            return formatPhone;
            break;
        case 'cep':
            const formatCep = notFormat.replace(/\D/g, '')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{3})\d+?$/, '$1');

            return formatCep;
            break;
        case 'date':
            const formatDate = notFormat.replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{2})(\d)/, '$1/$2')
            .replace(/(\d{4})(\d+?$)/, '$1');

            return formatDate;
            break;
        case 'price':
            const formatPrice = notFormat.replace(/\D/g,"")
            .replace(/(\d{1})(\d{13})$/,"$1.$2") 
            .replace(/(\d{1})(\d{10})$/,"$1.$2") 
            .replace(/(\d{1})(\d{7})$/,"$1.$2")
            .replace(/(\d{1})(\d{4})$/,"$1.$2")
            .replace(/(\d{1})(\d{1,1})$/,"$1,$2");

            return formatPrice;
            break;
    };
};

class Actions {
    constructor() {
        this.inputsRegex = document.querySelectorAll('[data-regex]');

        this.vehicle_value = document.querySelector('[data-vehicle-value]');
    }

    applyRegex() {
        const list = [...this.inputsRegex];
        this.inputsRegex.forEach((input) => {
            input.addEventListener( 'keypress' , (e) => {
                // disabled last key.
                switch(e.target.name) {
                    case 'phone':
                        if(e.target.value.length == 15) {
                            e.preventDefault();
                            return;
                        };
                        break
                    case 'cnpj':
                        if(e.target.value.length == 18) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    case 'cpf':
                        if(e.target.value.length == 14) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    case 'date':
                        if(e.target.value.length == 10) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    case 'cep':
                        if(e.target.value.length == 9) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    default:
                        break;
                }

                // linear code
                (e.key == ' ') && e.preventDefault();
                if(e.key < 10) {
                    const formatted = formatter(e.target.name, e.target.value);

                    // input value < vehicle value
                    if(e.target.id == 'input_value') {
                        const bigger = Number(this.vehicle_value.value.replace(/\./g, '').replace(',', '.'));
                        const smaller = Number(formatted.replace(/\./g, '').replace(',', '.'));
                        if(bigger < smaller) {
                            e.preventDefault();
                            return;
                        }
                    }

                    // value with mask
                    input.value = formatted;
                } else {
                    e.preventDefault();
                };
            });

            // ctrl+c - ctrl+v
            input.addEventListener( 'change' , (e) => {
                if(e.target.name == 'price') return;
                // disabled last key.
                switch(e.target.name) {
                    case 'phone':
                        if(e.target.value.length == 15) {
                            e.preventDefault();
                            return;
                        };
                        break
                    case 'cnpj':
                        if(e.target.value.length == 18) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    case 'cpf':
                        if(e.target.value.length == 14) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    case 'date':
                        if(e.target.value.length == 10) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    case 'cep':
                        if(e.target.value.length == 9) {
                            e.preventDefault();
                            return;
                        };
                        break;
                    default:
                        break;
                }

                // linear code
                const formatted = formatter(e.target.name, e.target.value);

                // value with mask
                input.value = formatted;
            });
        });
    }

    async fetchCep(cep) {
        try {
            const required = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const response = await required.json();
            if(response.erro) throw new Error('CEP Inválido.');

            document.querySelector('[data-logradouro]').value = response.logradouro;
            document.querySelector('[data-bairro]').value = response.bairro;
            document.querySelector('[data-localidade]').value = response.localidade;
        } catch (error) {
            console.log('Error: Falha ao buscar CEP');
            console.log(error.message);
        }
    }
}
const actions = new Actions();
actions.applyRegex();


// === Buscar CEP ===
const inputCep = document.querySelector('[data-input-cep]');
inputCep.addEventListener( 'change', (e) => {
    const cepNoMask = e.target.value.replace(/[\D]+/g,'');
    actions.fetchCep(cepNoMask);
});


// === Cálculo de Financiamento ===
class CalcFinanced {
    constructor() {
        this.vehicle_value = document.querySelector('[data-vehicle-value]');
        this.input_value = document.querySelector('[data-input-value]');
        this.amount_financed = document.querySelector('[data-amount-financed]');
    }

    set_amount_value() {
        const vehicleValue = Number(this.vehicle_value.value.replace(/\./g, '').replace(',', '.'));
        const inputValue = Number(this.input_value.value.replace(/\./g, '').replace(',', '.'));
        const amountValue = vehicleValue - inputValue;
        this.amount_financed.value = formatter('price', (amountValue.toFixed(1)).toString());
    }

    autoCalc() {
        this.input_value.addEventListener('change', () => {
            this.set_amount_value();
        })
    }
};
const inputsFinancedPrice = new CalcFinanced();
inputsFinancedPrice.autoCalc();


// === Event Submit ===
const form = document.querySelector('[data-form]');
const principalData = {};

const generatorId = () => {
    const id = `${Math.random().toString(36).slice(5)}-${Math.random().toString(36).slice(5)}`;
    return id;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const button = document.querySelector('[data-btn-send]');
    button.classList.add('sending');
    principalData.form_id = generatorId();

    for(let key in e.target) {
        if(!isNaN(key)) {
            if(e.target[key].localName == 'input' && e.target[key].value) {
                if(e.target[key].type == 'radio') {
                    if (e.target[key].checked) principalData[e.target[key].name] = e.target[key].value.trim();
                    e.target[key].checked = false;
                    continue;
                }
                principalData[e.target[key].id] = e.target[key].value.trim();
                e.target[key].value = '';
            } 
            if(e.target[key].localName == 'textarea' && e.target[key].value) {
                principalData[e.target[key].id] = e.target[key].value.trim();
                e.target[key].value = '';
            }
        } 
    }

    sendData();
    setTimeout(() => {
        button.classList.remove('sending'); 
        window.scroll({top: 0, behavior: 'smooth'});
    }, [2500]);
});

const sendData = async () => {
    try {
        await fetch('https://api-form-deltacapital.onrender.com/send', {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(principalData)
        }).then( res => {
            console.log('status:', res.status);
        });
    } catch (error) {
        console.log(error);
    } finally {
        const response = document.querySelector('[data-response]');
        response.classList.add('response');
        setTimeout( () => {
            response.classList.remove('response');
        }, [4000]);
    }
};

// == year model select ==
const inputManufacture = document.querySelector('[data-year-manufacture]');
inputManufacture.addEventListener('change', (e) => {
    const listBtns = document.querySelectorAll('[data-choose-model]');
    listBtns.forEach( (button, index) => {
        button.innerText = Number(e.target.value) + index;
        button.value = Number(e.target.value) + index;
    });
});
