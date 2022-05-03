<script lang="ts">
  let step = 1;
  const estinien = 'images/estinien.png';

  const getMultipleRandom = (arr: Array<HTMLElement>, num: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}

  const stepOne = () => {
    let party = [
      document.getElementById('tankOne'),
      document.getElementById('tankTwo'),
      document.getElementById('healerOne'),
      document.getElementById('healerTwo'),
      document.getElementById('meleeOne'),
      document.getElementById('meleeTwo'),
      document.getElementById('magicRanged'),
      document.getElementById('physRanged')
    ];

    const createDebuff = (img: string) => {
      const elem = document.createElement("img");
      elem.src = img;
      elem.setAttribute('class', 'debuff-sizing');
      elem.setAttribute('alt', 'first in line debuff');
      return elem;
    }

    const firstMarkers = getMultipleRandom(party, 3);
    party = party.filter( ( el ) => !firstMarkers.includes( el ) );
    const secondMarkers = getMultipleRandom(party, 2);
    party = party.filter( ( el ) => !secondMarkers.includes( el ) );

    firstMarkers.forEach(char => {
      char.append(createDebuff('images/First_In_Line.png'));
    })
    if ((Math.floor(Math.random() * 2)) === 0) {
      firstMarkers[0].append(createDebuff('images/High_Jump_target.png'));
      firstMarkers[1].append(createDebuff('images/Elusive_Jump_target.png'));
      firstMarkers[2].append(createDebuff('images/Spineshatter_Dive_target.png'));
    } else {
      firstMarkers.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png'));
      });
    }
    secondMarkers.forEach(char => {
      char.append(createDebuff('images/Second_In_Line.png'));
    })
    if ((Math.floor(Math.random() * 2)) === 0) {
      secondMarkers[0].append(createDebuff('images/Elusive_Jump_target.png'));
      secondMarkers[1].append(createDebuff('images/Spineshatter_Dive_target.png'));
    } else {
      secondMarkers.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png'));
      });
    }
    party.forEach(char => {
      char.append(createDebuff('images/Third_In_Line.png'));
    })
    if ((Math.floor(Math.random() * 2)) === 0) {
      party[0].append(createDebuff('images/High_Jump_target.png'));
      party[1].append(createDebuff('images/Elusive_Jump_target.png'));
      party[2].append(createDebuff('images/Spineshatter_Dive_target.png'));
    } else {
      party.forEach(char => {
        char.append(createDebuff('images/High_Jump_target.png'));
      });
    }
  };


  window.onload = () => {
    stepOne();
    document.getElementById('nextStepButton').addEventListener('click', () => {
      step = step + 1;
      switch (step) {
        case 2:
          // stepTwo();
      }
    })
  }
</script>

<div class="position-absolute top-50 end-50">
  <img src={estinien} alt="estinien icon" class='boss-sizing face-north' />
</div>

<!-- <div class="position-absolute top-0 end-0 mt-5">
  <ul class="list-unstyled mt-5">
    <li>0:00    Final Chorus (Raidwide)</li>
    <li>0:00     Targetable</li>
    <li>0:13    Dive from Grace (Markers go out)</li>
    <li>&#9755 0:18    Dive from Grace (Debuffs go out)</li>
    <li>0:27    Lash And Gnash & Gnash And Lash Cast (In/Out or Out/In)</li>
    <li>0:28    First in Line: High Jump & Eye of the Tyrant (Shared AoE)</li>
    <li>0:32    Lash/Gnash Part 1 (In/Out)</li>
    <li>0:34    First in Line: Tower Soaks</li>
    <li>0:35    Lash/Gnash Part 2 (In/Out)</li>
    <li>0:36    First in Line: Clone Baits</li>
    <li>0:38    Second in Line: High Jump</li>
    <li>0:40    First in Line: Clone Geirskoguls</li>
    <li>0:44     Second in Line: Tower Soaks</li>
    <li>0:46    Second in Line: Clone Baits</li>
    <li>0:48    Third in Line: High Jump & Eye of the Tyrant (Shared AoE)</li>
    <li>0:50    Second in Line: Clone Geirskoguls</li>
    <li>0:52    Lash/Gnash Part 1</li>
    <li>0:56    Third in Line: Tower Soaks</li>
    <li>0:57    Lash/Gnash Part 2</li>
    <li>0:58    Third in Line: Clone Baits</li>
    <li>1:01    Cleaving Autos Resume</li>
    <li>1:03    Third in Line: Geirskoguls</li>
    <li>1:07    Drachenlance (Baited Cleave)</li>
    <li>1:10    Darkdragon Dive: Towers Appear (Enumerations)</li>
    <li>1:14    Darkdragon Dive: Tower Soaks</li>
    <li>1:17    Darkdragon Dive: Baits</li>
    <li>1:21    Darkdragon Dive: Tethers & Geirskoguls</li>
    <li>1:23    Soul Tether (Tankbuster Tethers)</li>
    <li>1:28    Cleaving Autos Resume</li>
    <li>1:45    Drachenlance (Baited Cleave)</li>
    <li>1:58    Revenge of the Horde</li>
  </ul>
</div> -->
