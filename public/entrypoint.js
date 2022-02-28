// @ts-check
/* global notebook */
/// <reference types="@i2analyze/notebook-sdk" />

const controllerSVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.47 8.47">
  <path d="M2.65 2.45c-.58 0-1.05.22-1.35.6-.3.38-.44.89-.44 1.45 0 .6.32 1 .7 1.23.36.22.79.29 1.09.29.59 0 .88-.39 1.1-.53h1.23c.22.14.51.53 1.1.53.3 0 .73-.07 1.1-.3.37-.22.7-.63.7-1.22 0-.56-.15-1.07-.45-1.45-.3-.38-.77-.6-1.34-.6Zm0 .4h3.44c.48 0 .8.16 1.03.45.23.28.35.7.35 1.2 0 .46-.2.71-.5.89-.28.17-.65.23-.88.23-.44 0-.6-.3-.97-.5l-.04-.03H3.65l-.04.03c-.36.2-.53.5-.96.5-.24 0-.6-.06-.9-.23a.95.95 0 0 1-.5-.9c0-.49.13-.9.36-1.2.23-.28.56-.45 1.04-.45Z" />
  <path d="M2.4 3.44v1.59h.48v-1.6Z"  />
  <path d="M1.85 4v.47h1.59V4Z" />
  <circle cx="6.09" cy="3.7" r=".26"/>
  <circle cx="6.09" cy="4.76" r=".26"/>
  <circle cx="6.61" cy="4.23" r=".26"/>
  <circle cx="5.56" cy="4.23" r=".26"/>
  <path d="M7.28.53c0 .06-.03.1-.09.17a.98.98 0 0 1-.3.18c-.25.13-.61.23-.98.35-.36.12-.73.24-1.03.41-.29.17-.51.42-.51.74h.26c0-.2.14-.36.39-.5.25-.16.61-.28.97-.4.37-.11.73-.22 1.02-.35.14-.07.27-.15.37-.24a.5.5 0 0 0 .16-.36Z"/>
</svg>`;

async function main() {
  const api = await notebook.getEntryPointApi(
    "f7eb352a-8d41-4103-8aad-6fc7ac8e5d58",
    "1.0"
  );
  api.logger.info("plug-in running");

  const toolView = api.createToolView("Arcade", "./");

  const toggleArcade = api.commands.createToolViewToggleCommand(
    {
      id: "7ee56433-6d76-44dc-b9c0-ec56e4c7699c",
      name: "Arcade",
      icon: {
        type: "inlineSvg",
        svg: controllerSVG,
      },
      keyboardHelp: {
        category: "discover",
        keys: ["mod+a"],
        label: "Toggle Arcade",
      },
    },
    toolView
  );

  const homeTab = api.commands.applicationRibbon.homeTab;

  homeTab
    .after(homeTab.systemGroups.searchInfoStore)
    .surfaceCommands(toggleArcade);

  api.initializationComplete();
}

void main();
