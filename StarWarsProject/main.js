let cardArea = document.getElementById("charactersArea")
        let radioArea = document.getElementById("radiosArea")
        let charactersShowOrHideButton = document.getElementById("charactersButton")
        charactersShowOrHideButton.addEventListener("click", charactersInfoAndChangeButton)
        function charactersInfoAndChangeButton(){showOrHide()}
        function createCards()
        {
            /*Cardları Oluşturma*/
            for(let i=0;i<people.characters.length;i++)
            {
                /*Bu koşul her butona tıkladığınıda tekrar card oluşturduğu için gerekli*/
                if(document.getElementsByClassName("card").length < people.characters.length)
                {
                let column = document.createElement("div")
                column.classList.add("col-12","col-sm-6","col-md-4","col-lg-3");
                cardArea.appendChild(column);
                let card = document.createElement("div");
                card.classList.add("card");
                column.appendChild(card);
                let image = document.createElement("img");
                image.classList.add("card-img-top");
                image.alt = "characters"
                image.src = people.characters[i].pic
                card.appendChild(image);
                let cardBody = document.createElement("div")
                cardBody.classList.add("card-body")
                card.appendChild(cardBody)
                let cardBaslik = document.createElement("h5")
                cardBaslik.classList.add("card-title")
                cardBaslik.innerHTML =  people.characters[i].name
                cardBody.appendChild(cardBaslik)
                let cardYazi = document.createElement("p")
                cardYazi.classList.add("card-text")
                if(people.characters[i].homeworld == null || undefined)
                {
                    people.characters[i].homeworld = "other"
                    card.id = people.characters[i].homeworld
                    cardYazi.innerHTML =  people.characters[i].homeworld.toUpperCase()
                }
                else
                {
                    card.id = people.characters[i].homeworld
                    cardYazi.innerHTML =  people.characters[i].homeworld.toUpperCase()
                }
                cardBody.appendChild(cardYazi)
                }
                else break;
            }
            return cardArea
        }
        function showOrHide()
        {
            var rdiobtndiv = document.querySelectorAll(".radiolabel")
            for(let i=0;i<rdiobtndiv.length;i++)
            {
                rdiobtndiv[i].style.backgroundColor = "transparent"
            }
            var ele = document.querySelectorAll("input[type=radio]");
            for(let i=0;i<ele.length;i++){
            ele[i].checked = false;}
            let dizi = []
            for(i=0;i<charactersShowOrHideButton.classList.length;i++)
            {
                dizi.push(charactersShowOrHideButton.classList[i])
            }
            if(dizi.includes("btn-success"))
            {
                charactersShowOrHideButton.classList.replace("btn-success","btn-danger")
                charactersShowOrHideButton.innerHTML = "Karakterleri Gizle"
                createCards()
            }
            else
            {
                charactersShowOrHideButton.classList.replace("btn-danger","btn-success")
                charactersShowOrHideButton.innerHTML = "Karakterleri Göster"
                for(let i=0;i<people.characters.length;i++)
                {
                    document.querySelector("#charactersArea .col-12").remove()
                }
            }
            
        }
        let homeworldUnique = []
        function uniqueHomeWorlds()
        {
            let homeworldsRaw = []
            for(tempHomeworld of people.characters)
            {
                if(tempHomeworld.homeworld != null || undefined)
                {homeworldsRaw.push(tempHomeworld.homeworld)}
                else{homeworldsRaw.push("other")}
            }
            homeworldsRaw.forEach(element => {
                if(homeworldUnique.includes(element) == false)
                {homeworldUnique.push(element.toLowerCase())}
            });
            return homeworldUnique
    }
        function createRadios()
        {
            uniqueHomeWorlds()
            for(let i=0;i<homeworldUnique.length;i++)
            {
                let formDiv = document.createElement("div")
                formDiv.classList.add("col-6","col-md-3","col-xl-2","form-check")
                radioArea.appendChild(formDiv)
                let radioAndLabel = document.createElement("div")
                radioAndLabel.classList.add("radiolabel")
                formDiv.appendChild(radioAndLabel)
                let radioInput = document.createElement("input")
                radioInput.classList.add("radio-input")
                radioInput.type = "radio"
                radioInput.name = "exampleRadios"
                radioInput.id = "exampleRadios"+(i+1)
                radioAndLabel.appendChild(radioInput)
                let radioLabel = document.createElement("label")
                radioLabel.classList.add("form-check-label")
                radioLabel.innerHTML = homeworldUnique[i].toUpperCase()
                radioLabel.setAttribute("for","exampleRadios"+(i+1))
                radioAndLabel.appendChild(radioLabel)
            }
        }
        createRadios()
        for(let i=0;i<homeworldUnique.length;i++)
        {
            document.getElementsByClassName("radiolabel")[i].addEventListener("click",getFilteredHomeWorld)
        }   
        function getFilteredHomeWorld(event)
        {
            var outerelement = event.currentTarget.querySelector(".radiolabel .radio-input")
            outerelement.checked = true
            for(let i=0;i<document.getElementsByClassName("radiolabel").length;i++)
            {
                if(document.getElementsByClassName("radiolabel")[i].querySelector("input").checked == true)
                {
                    document.getElementsByClassName("radiolabel")[i].style.backgroundColor = " #dc3545"
                }
                else
                {
                    document.getElementsByClassName("radiolabel")[i].style.backgroundColor = "transparent"
                }
            }
            createCards()
            for(let i=0;i<people.characters.length;i++)
            {
                let columnCard = cardArea.getElementsByClassName("col-12")[i]
                let filteredCard = columnCard.querySelector(".card")
                if(filteredCard.id.toLocaleUpperCase() != event.currentTarget.querySelector(".form-check .form-check-label").innerHTML)
                {
                    columnCard.style.display = "none"
                    charactersShowOrHideButton.innerHTML = "Karakterleri Gizle"
                    charactersShowOrHideButton.classList.replace("btn-success","btn-danger")
                }
                else
                {
                    columnCard.style.display = "flex"
                }
            }
        }