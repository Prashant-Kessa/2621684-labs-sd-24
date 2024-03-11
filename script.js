
function getCountryInfo() {
    var countryInput = document.getElementById('countryInput').value;
    var url = `https://restcountries.com/v3.1/name/${countryInput}?fullText=true`;

    fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(jsonData => {
        const countryName = jsonData[0].name.common;
        const capital = jsonData[0].capital;
        const population = jsonData[0].population;
        const region = jsonData[0].region;

        //console.log('Country Name:', countryName);

        var nametxt = document.getElementById("name");
        nametxt.textContent = countryName;

        var capitaltxt = document.getElementById("capital");
        capitaltxt.textContent += " " + capital;

        var populationtxt = document.getElementById("population");
        populationtxt.textContent += " " + population;
        
        var regiontxt = document.getElementById("region");
        regiontxt.textContent += " " + region;

        document.getElementById("flag").src = jsonData[0].flags.png;
        
        if(jsonData[0].borders.length > 0){
            for(var i = 0; i< jsonData[0].borders.length; i++){
                var border = jsonData[0].borders[i];
                var borderUrl = `https://restcountries.com/v3.1/alpha/${border}?fullText=true`;
                fetch(borderUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(jsonData => {
                    var borders = document.getElementById("borders");
                    borders.textContent += " " + jsonData[0].name.common;
                    
                    var borderFlag = document.getElementById("borderFlag");
                    var flag = document.createElement("img");
                    flag.src = jsonData[0].flags.png;
                    flag.width = "30";
                    flag.height = "20";
                    borderFlag.appendChild(flag);


                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
}
