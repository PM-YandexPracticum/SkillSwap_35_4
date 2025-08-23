export type HeaderProps = {
  onLogoClick?: () => void;
  onAboutClick?: () => void;
  onAllSkillsClick?: () => void;
  onSearch: (query: string) => void;
  onThemeToggle?: () => void;
  onLogin?: () => void;
  onRegister?: () => void;
  darkTheme?: boolean;
};
