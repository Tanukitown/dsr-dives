<script lang="ts">
  import { draggable } from 'svelte-drag';


  let tankIcon = 'images/Tank_Icon_Flat_1.png';
  let healerIcon = 'images/Healer_Icon_Flat_1.png';
  let meleeIcon = 'images/Melee_DPS_Icon_Flat_1.png';
  let magicRangedIcon = 'images/Magic_ranged_DPS_Icon_Flat_1.png';
  let physRangedIcon = 'images/Physical_Ranged_DPS_Flat_Icon_1.png';
</script>

<div>
  <div>
    <img use:draggable src={tankIcon} alt="tank icon" class='icon-sizing' />
  </div>
  <div class="mt-2" />
  <div>
    <img use:draggable src={tankIcon} alt="tank icon" class='icon-sizing' />
  </div>
  <div class="mt-2" />
  <div>
    <img use:draggable src={healerIcon} alt="healer icon" class='icon-sizing' />
  </div>
  <div class="mt-2" />
  <div>
    <img use:draggable src={healerIcon} alt="healer icon" class='icon-sizing' />
  </div>
  <div class="mt-2" />
  <div>
    <img use:draggable src={meleeIcon} alt="melee icon" class='icon-sizing' />
  </div>
  <div class="mt-2" />
  <div>
    <img use:draggable src={meleeIcon} alt="melee icon" class='icon-sizing' />
  </div>
  <div class="mt-2" />
  <div>
    <img use:draggable src={magicRangedIcon} alt="magic ranged icon" class='icon-sizing' />
  </div>
  <div class="mt-2" />
  <div>
    <img use:draggable src={physRangedIcon} alt="phys ranged icon" class='icon-sizing' />
  </div>
</div>
