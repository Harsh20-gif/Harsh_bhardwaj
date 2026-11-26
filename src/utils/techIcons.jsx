import {
  FaBootstrap,
  FaC,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaLaravel,
  FaLinux,
  FaPhp,
  FaPython,
  FaReact,
  FaServer,
  FaShieldHalved,
} from 'react-icons/fa6';
import {
  SiApachemaven,
  SiEclipseide,
  SiFigma,
  SiFlask,
  SiHibernate,
  SiIntellijidea,
  SiJavascript,
  SiJira,
  SiJsonwebtokens,
  SiJunit5,
  SiMysql,
  SiPostman,
  SiSpringboot,
  SiSpringsecurity,
  SiXampp,
} from 'react-icons/si';
import { TbApi, TbDatabaseCog } from 'react-icons/tb';
import { VscVscode } from 'react-icons/vsc';

export const TECH_ICON_MAP = {
  java: FaJava,
  javascript: SiJavascript,
  sql: FaDatabase,
  php: FaPhp,
  python: FaPython,
  c: FaC,
  springboot: SiSpringboot,
  jpa: TbDatabaseCog,
  hibernate: SiHibernate,
  rest: TbApi,
  junit: SiJunit5,
  laravel: FaLaravel,
  flask: SiFlask,
  react: FaReact,
  html5: FaHtml5,
  css3: FaCss3Alt,
  bootstrap: FaBootstrap,
  mysql: SiMysql,
  xampp: SiXampp,
  springsecurity: SiSpringsecurity,
  jwt: SiJsonwebtokens,
  rbac: FaShieldHalved,
  git: FaGitAlt,
  maven: SiApachemaven,
  postman: SiPostman,
  intellij: SiIntellijidea,
  eclipse: SiEclipseide,
  vscode: VscVscode,
  jira: SiJira,
  figma: SiFigma,
  linux: FaLinux,
};

export function TechIcon({ iconKey, className = '', size = 20 }) {
  const IconComponent = TECH_ICON_MAP[iconKey] || FaServer;
  return <IconComponent className={className} size={size} aria-hidden="true" />;
}
