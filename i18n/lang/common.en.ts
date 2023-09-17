const translation = {
  api: {
    success: 'Success',
    saved: 'Saved',
    create: 'Created',
    remove: 'Removed',
  },
  operation: {
    create: 'Create',
    confirm: 'Confirm',
    cancel: 'Cancel',
    clear: 'Clear',
    save: 'Save',
    edit: 'Edit',
    add: 'Add',
    refresh: 'Restart',
    reset: 'Reset',
    search: 'Search',
    change: 'Change',
    remove: 'Remove',
    send: 'Send',
    copy: 'Copy',
    lineBreak: 'Line break',
    sure: 'I\'m sure',
    download: 'Download',
  },
  placeholder: {
    input: 'Please enter',
    select: 'Please select',
  },
  unit: {
    char: 'chars',
  },
  actionMsg: {
    modifiedSuccessfully: 'Modified successfully',
    modificationFailed: 'Modification failed',
    copySuccessfully: 'Copied successfully',
  },
  model: {
    params: {
      temperature: 'Temperature',
      temperatureTip:
        'Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.',
      topP: 'Top P',
      topPTip:
        'Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.',
      presencePenalty: 'Presence penalty',
      presencePenaltyTip:
        'How much to penalize new tokens based on whether they appear in the text so far. Increases the model\'s likelihood to talk about new topics.',
      frequencyPenalty: 'Frequency penalty',
      frequencyPenaltyTip:
        'How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model\'s likelihood to repeat the same line verbatim.',
      maxToken: 'Max token',
      maxTokenTip:
        'Max tokens depending on the model. Prompt and completion share this limit. One token is roughly 1 English character.',
      maxTokenSettingTip: 'Your max token setting is high, potentially limiting space for prompts, queries, and data. Consider setting it below 2/3.',
      setToCurrentModelMaxTokenTip: 'Max token is updated to the maximum token of the current model {{maxToken}}.',
    },
    tone: {
      Creative: 'Creative',
      Balanced: 'Balanced',
      Precise: 'Precise',
      Custom: 'Custom',
    },
  },
  menus: {
    status: 'beta',
    explore: 'Explore',
    apps: 'Build Apps',
    plugins: 'Plugins',
    pluginsTips: 'Integrate third-party plugins or create ChatGPT-compatible AI-Plugins.',
    datasets: 'Datasets',
    datasetsTips: 'COMING SOON: Import your own text data or write data in real-time via Webhook for LLM context enhancement.',
    newApp: 'New App',
    newDataset: 'Create dataset',
  },
  userProfile: {
    settings: 'Settings',
    workspace: 'Workspace',
    createWorkspace: 'Create Workspace',
    helpCenter: 'Help Document',
    about: 'About',
    logout: 'Log out',
  },
  settings: {
    accountGroup: 'ACCOUNT',
    workplaceGroup: 'WORKPLACE',
    account: 'My account',
    members: 'Members',
    integrations: 'Integrations',
    language: 'Language',
    provider: 'Model Provider',
    dataSource: 'Data Source',
    plugin: 'Plugins',
  },
  account: {
    avatar: 'Avatar',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    passwordTip: 'You can set a permanent password if you don’t want to use temporary login codes',
    setPassword: 'Set a password',
    resetPassword: 'Reset password',
    currentPassword: 'Current password',
    newPassword: 'New password',
    confirmPassword: 'Confirm password',
    notEqual: 'Two passwords are different.',
    langGeniusAccount: 'InfraHive account',
    langGeniusAccountTip: 'Your InfraHive account and associated user data.',
    editName: 'Edit Name',
    showAppLength: 'Show {{length}} apps',
  },
  members: {
    team: 'Team',
    invite: 'Add',
    name: 'NAME',
    lastActive: 'LAST ACTIVE',
    role: 'ROLES',
    pending: 'Pending...',
    owner: 'Owner',
    admin: 'Admin',
    adminTip: 'Can build apps & manage team settings',
    normal: 'Normal',
    normalTip: 'Only can use apps, can not build apps',
    inviteTeamMember: 'Add team member',
    inviteTeamMemberTip: 'They can access your team data directly after signing in.',
    email: 'Email',
    emailInvalid: 'Invalid Email Format',
    emailPlaceholder: 'Input Email',
    sendInvite: 'Add',
    invitationSent: 'Invitation sent',
    invitationSentTip: 'Invitation sent, and they can sign in to InfraHive to access your team data.',
    invitationLink: 'Invitation Link',
    ok: 'OK',
    removeFromTeam: 'Remove from team',
    removeFromTeamTip: 'Will remove team access',
    setAdmin: 'Set as administrator',
    setMember: 'Set to ordinary member',
    disinvite: 'Cancel the invitation',
    deleteMember: 'Delete Member',
    you: '(You)',
  },
  integrations: {
    connected: 'Connected',
    google: 'Google',
    googleAccount: 'Login with Google account',
    github: 'GitHub',
    githubAccount: 'Login with GitHub account',
    connect: 'Connect',
  },
  language: {
    displayLanguage: 'Display Language',
    timezone: 'Time Zone',
  },
  provider: {
    apiKey: 'API Key',
    enterYourKey: 'Enter your API key here',
    invalidKey: 'Invalid OpenAI API key',
    validatedError: 'Validation failed: ',
    validating: 'Validating key...',
    saveFailed: 'Save api key failed',
    apiKeyExceedBill: 'This API KEY has no quota available, please read',
    addKey: 'Add Key',
    comingSoon: 'Coming Soon',
    editKey: 'Edit',
    invalidApiKey: 'Invalid API key',
    azure: {
      apiBase: 'API Base',
      apiBasePlaceholder: 'The API Base URL of your Azure OpenAI Endpoint.',
      apiKey: 'API Key',
      apiKeyPlaceholder: 'Enter your API key here',
      helpTip: 'Learn Azure OpenAI Service',
    },
    openaiHosted: {
      openaiHosted: 'Hosted OpenAI',
      onTrial: 'ON TRIAL',
      exhausted: 'QUOTA EXHAUSTED',
      desc: 'The OpenAI hosting service provided by InfraHive allows you to use models such as GPT-3.5. Before your trial quota is used up, you need to set up other model providers.',
      callTimes: 'Call times',
      usedUp: 'Trial quota used up. Add own Model Provider.',
      useYourModel: 'Currently using own Model Provider.',
      close: 'Close',
    },
    anthropicHosted: {
      anthropicHosted: 'Anthropic Claude',
      onTrial: 'ON TRIAL',
      exhausted: 'QUOTA EXHAUSTED',
      desc: 'Powerful model, which excels at a wide range of tasks from sophisticated dialogue and creative content generation to detailed instruction.',
      callTimes: 'Call times',
      usedUp: 'Trial quota used up. Add own Model Provider.',
      useYourModel: 'Currently using own Model Provider.',
      close: 'Close',
    },
    anthropic: {
      using: 'The embedding capability is using',
      enableTip: 'To enable the Anthropic model, you need to bind to OpenAI or Azure OpenAI Service first.',
      notEnabled: 'Not enabled',
      keyFrom: 'Get your API key from Anthropic',
    },
    encrypted: {
      front: 'Your API KEY will be encrypted and stored using',
      back: ' technology.',
    },
  },
  dataSource: {
    add: 'Add a data source',
    connect: 'Connect',
    notion: {
      title: 'Notion',
      description: 'Using Notion as a data source for the dataset.',
      connectedWorkspace: 'Connected workspace',
      addWorkspace: 'Add workspace',
      connected: 'Connected',
      disconnected: 'Disconnected',
      changeAuthorizedPages: 'Change authorized pages',
      pagesAuthorized: 'Pages authorized',
      sync: 'Sync',
      remove: 'Remove',
      selector: {
        pageSelected: 'Pages Selected',
        searchPages: 'Search pages...',
        noSearchResult: 'No search resluts',
        addPages: 'Add pages',
        preview: 'PREVIEW',
      },
    },
  },
  plugin: {
    serpapi: {
      apiKey: 'API Key',
      apiKeyPlaceholder: 'Enter your API key',
      keyFrom: 'Get your SerpAPI key from SerpAPI Account Page',
    },
  },
  about: {
    changeLog: 'Changlog',
    updateNow: 'Update now',
    nowAvailable: 'InfraHive {{version}} is now available.',
    latestAvailable: 'InfraHive {{version}} is the latest version available.',
  },
  appMenus: {
    overview: 'Overview',
    promptEng: 'Prompt Eng.',
    apiAccess: 'API Access',
    logAndAnn: 'Logs & Ann.',
  },
  environment: {
    testing: 'TESTING',
    development: 'DEVELOPMENT',
  },
  appModes: {
    completionApp: 'Text Generator',
    chatApp: 'Chat App',
  },
  datasetMenus: {
    documents: 'Documents',
    hitTesting: 'Hit Testing',
    settings: 'Settings',
    emptyTip: 'The data set has not been associated, please go to the application or plug-in to complete the association.',
    viewDoc: 'View documentation',
    relatedApp: 'linked apps',
  },
  voiceInput: {
    speaking: 'Speak now...',
    converting: 'Converting to text...',
    notAllow: 'microphone not authorized',
  },
}

export default translation