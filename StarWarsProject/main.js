        let cardArea = document.getElementById("charactersArea")
        let radioArea = document.getElementById("radiosArea")
        let charactersShowOrHideButton = document.getElementById("charactersButton")
        charactersShowOrHideButton.addEventListener("click", charactersInfoAndChangeButton)
        createOption()
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
                if(homeworldUnique.includes(element.toLowerCase()) == false)
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
        function createOption()
        {
            for(let i=0;i<people.characters.length;i++)
        {
            let opt = document.createElement("option")
            opt.value = people.characters[i].name
            opt.innerHTML = people.characters[i].name
            document.getElementById("swcharacters").appendChild(opt)
        }
        }
        let addObj = document.getElementById("sendbtn")
        addObj.addEventListener("click", () =>
        { 
        form()
        if(submitOK == true)
        {
            getCharacterToOption()
            for(let i=0;i<people.characters.length-1;i++)
            {
                document.querySelector("option").remove()
            }
            createOption()
        }
        document.getElementById("input-name").value = ""
        document.getElementById("input-homeworld").value = ""
        })
        function getCharacterToOption()
        {
            let inputName = document.getElementById("input-name").value
            let inputHomeWorld = document.getElementById("input-homeworld").value
            let inputPhoto = document.getElementById("input-url").value
            let id = people.characters.length+5
            people.characters.push({"id":id,"name":inputName,"pic":inputPhoto,"homeworld":inputHomeWorld})
            for(let i=0;i<homeworldUnique.length;i++)
            {
                document.querySelector(".form-check").remove()
            }
            createRadios()
            for(let i=0;i<homeworldUnique.length;i++)
        {
            document.getElementsByClassName("radiolabel")[i].addEventListener("click",getFilteredHomeWorld)
        }  
        if(event.currentTarget.tagName  != "BUTTON")
        {
            getFilteredHomeWorld()
        }
        let dizi = []
            for(i=0;i<charactersShowOrHideButton.classList.length;i++)
            {
                dizi.push(charactersShowOrHideButton.classList[i])
            }
            if(dizi.includes("btn-success"))
            {
                
            }
            else
            {
                charactersShowOrHideButton.classList.replace("btn-danger","btn-success")
                charactersShowOrHideButton.innerHTML = "Karakterleri Göster"
                for(let i=0;i<people.characters.length-1;i++)
                {
                    document.querySelector("#charactersArea .col-12").remove()
                }
                createCards()
            }
        }
        function form()
        {
            var fname = document.getElementById("input-name").value;
            var fhomeworld = document.getElementById("input-homeworld").value;
            submitOK = true;
            pattern = /[0-9]/g;
            if(fhomeworld.search(pattern) != -1)
            {
                alert("Memleket rakam içeremez!");
                submitOK = false;
            }
            else if(fhomeworld.length<1)
            {
                alert("Memleket boş olamaz!");
                submitOK = false;
            }
            if ((fname.search(pattern)) != -1) {
                alert("İsim rakam içeremez!");
                submitOK = false;
            }
            else if(fname.length > 15)
            {
                alert("İsim 15 karakterden daha büyük  olamaz!");
            }
            else if(fname.length < 1)
            {
                alert("İsim boş olamaz!");
            }
                submitOK = false;
            return false;
        }