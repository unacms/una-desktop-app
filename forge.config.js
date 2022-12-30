module.exports = {
  packagerConfig: {
    icon: './res/AppIcon',
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      config: {},
    },
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: './res/AppIcon.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin', 'win32'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './res/AppIcon.png'
        },
      },
    },
  ],
};
