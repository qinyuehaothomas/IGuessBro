// DOM content loadded
$(()=>{
    $("#start_btn").click(initialise);
    return
})

const BASE=3;
var MAX_BIT=0;
var BIT=0;
var MAX_GUESS=100;
var MAPPING={};
const [INPUT_UPPER,INPUR_LOWER]=[99,27]

// For mobile scroll trigger
var startX = 0;

var Bit2Color={
    null:"dim",
    0:"G",
    1:"B",
    2:"Y",
    3:"R"    
}
var Bit2ColorName={
    0:"Green",
    1:"Blue",
    2:"Yellow",
    3:"Red"    
}

const invert = obj => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
var Color2Bit=invert(Bit2Color)

var ANSWER_INPUT=[null,null,null,null,null];



const initialise=(e)=>{
    const max_guess_input=$("#max_guess").val()
    if( max_guess_input > INPUT_UPPER || max_guess_input < INPUR_LOWER ){

        // Validation
        // If not in range, raise a alert

        if (!$("#toast").length) {
        $("#start").append(
            $("<p>")
            .attr("id", "toast")
            .attr(
                "class",
                "fixed left-1/2 -translate-x-1/2 top-5 z-50 pointer-events-none text-red-400 border border-red-400 bg-red-500/10 backdrop-blur-sm px-4 py-2 rounded shadow-lg"
            )
            .text(`Input between ${INPUT_UPPER} ~ ${INPUR_LOWER} !`)
            .fadeOut(2000, () => {
                $("#toast").remove();
            })
        );
        }
        
        // Shake the button
        $("#start_btn").addClass("shake").on("animationend", ()=>{
            $("#start_btn").removeClass("shake").off("animationend");
        });
        return;
    }

    MAX_GUESS=max_guess_input;

    $('#start').fadeOut(500, function() {
        $(this).remove(); // or .addClass('hidden')
        // Optional: remove from DOM after animation ends
        $("#qn").fadeIn(500).toggleClass("hidden");
    });

    // MAX_BIT
    MAX_BIT=Math.ceil (Math.log(MAX_GUESS-1)/Math.log(BASE)) ;

    // Initalise number-color mapping
    ANSWER_INPUT=Array(MAX_BIT).fill(null);
    for( let i=1 ; i<=MAX_GUESS;i++) {
        // Key is the "actual" value -- the one that determines the color
        MAPPING[i]={dV:i-1,bits:""};// dV is display value

    }

    // Shuffle display and actual values
    // Fisher Yates Shuffle Algorithm
    for (let i = MAX_GUESS; i > 0; i--) {
        const j = Math.floor(Math.random() * (i))+1;

        // Swap using temp variable
        const temp = MAPPING[i]["dV"];
        MAPPING[i]["dV"] = MAPPING[j]["dV"];
        MAPPING[j]["dV"] = temp;

        MAPPING[i]["bits"]=MAPPING[i]["dV"].toString(BASE).padStart(MAX_BIT,"0")

        MAPPING[j]["bits"]=MAPPING[j]["dV"].toString(BASE).padStart(MAX_BIT,"0")
        
    }
    
    // Make blubs
    for(let idx=0;idx<MAX_BIT;idx++){
        let blub = $("<div></div>").addClass("size-4 rounded-full bg-dim transition-all duration-500").attr("id",`blub-${idx}`);
        $("#blub").append(blub);
    }
    updateblub();

    // Fill Number boxes
    $("#ngrid").empty();
    $.each(MAPPING,(key,val)=>{
        const color=Bit2Color[val.bits[BIT]]
        let num_box = $("<div class='num_box transition-all duration-500'></div>").text(key)
        .addClass(`${color} text-${color}` )
        .attr("id",`_${key}`)
        .on("mouseenter", ()=>$(`.${color}`).addClass(`bg-${color}/50`) )
        .on("mouseleave", () =>$(`.${color}`).removeClass(`bg-${color}/50`));
        $("#ngrid").append(num_box)
        
    });

    // Setup Buttons
    for(let b=0;b<BASE;b++){
        var btn=$("<button></button>").text(Bit2ColorName[b])
        .data("colorCode",Bit2Color[b])
        .addClass(Bit2Color[b])
        .addClass(`p-2 text-[3rem] text-${Bit2Color[b]} transition-all duration-500`)
        .click(submitColor)
        .on("mouseenter", ()=>$(`.${Bit2Color[b]}`).addClass(`bg-${Bit2Color[b]}/50`) )
        .on("mouseleave", () =>$(`.${Bit2Color[b]}`).removeClass(`bg-${Bit2Color[b]}/50`));
        $("#btns").append(btn);
    }

    // Trigger for scrolling
    $(document).keyup(function (e){
        if (["ArrowLeft","ArrowRight"].includes(e.key)) flip(e.key=="ArrowRight")
    });
    $(window)
    .on('wheel', function(e){
        flip(e.originalEvent.deltaY < 0)
    })
    .on("touchstart", e => startX = e.originalEvent.touches[0].clientX)
    .on("touchend", e => {
        const diff = startX - e.originalEvent.changedTouches[0].clientX;
        if (diff) flip(diff>0)
    });

};

const updateblub=()=>{
    $("#blub").children().removeClass('size-7').addClass('size-4')
    $(`#blub-${BIT}`).removeClass('size-4').addClass('size-7')
}

function submitColor(){
    const cur_color_code=$(this).data("colorCode")

    $(`#blub-${BIT}`).removeClass(`bg-${Bit2Color[ ANSWER_INPUT[BIT] ]}`)
    .addClass(`bg-${cur_color_code}`);
    ANSWER_INPUT[BIT] = Color2Bit[cur_color_code];
}

function flip(upDown){
    const prev_bit=BIT;

    if (!upDown){
        BIT=  Math.min(Math.max(BIT-1, 0), MAX_BIT);
    }
    else if (upDown && ANSWER_INPUT[BIT] != null){
        BIT=  Math.min(Math.max(BIT+1, 0), MAX_BIT);
        if (!ANSWER_INPUT.includes(null)) {
            displayAns();return;
        }
    }else return

    // Remove Old Color and Hook
    
    $.each(MAPPING,(key,val)=>{
        const color=Bit2Color[val.bits[prev_bit]]
        $(`#_${key}`).removeClass(`${color} text-${color} bg-${color}/50` )
        .off("mouseenter")
        .off("mouseleave")

    });
    
    // Add new color and hook
    $.each(MAPPING,(key,val)=>{
        const color=Bit2Color[val.bits[BIT]]
        $(`#_${key}`).addClass(`${color} text-${color}` )
        .on("mouseenter", ()=>$(`.${color}`).addClass(`bg-${color}/50`) )
        .on("mouseleave", () =>$(`.${color}`).removeClass(`bg-${color}/50`));
    });

    updateblub();


}


function displayAns(){
    
    $('#qn').fadeOut(500, function() {
        $("#qn").remove(); // or .addClass('hidden')
        // Optional: remove from DOM after animation ends
        $("#answer").fadeIn(500).removeAttr("style").toggleClass("hidden");
    });

    const ANS_STRING = ANSWER_INPUT.join(''); // "0123"
    const ANS = Object.keys(MAPPING).find(k => MAPPING[k].bits === ANS_STRING);
    $("#ans_num").text(ANS)
}