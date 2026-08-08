import Link from 'next/link';
import Legal from '../../components/Legal';
import {
    COMPANY_NAME,
    LAST_UPDATED,
    WHATSAPP_LINK,
    WHATSAPP_NUMBER,
} from '../../config/site';

export const metadata = {
    title: 'Termos de Uso | RN Design',
    description:
        'Condições de uso do site e das soluções de atendimento e automação da RN Design, incluindo as regras aplicáveis às integrações com a Plataforma WhatsApp Business.',
};

export default function TermosDeUso() {
    return (
        <Legal
            title="Termos de Uso"
            updatedAt={LAST_UPDATED}
            intro={`Estes Termos regem o acesso ao site e a contratação dos serviços da ${COMPANY_NAME}, incluindo as soluções de atendimento e automação que operam sobre a Plataforma WhatsApp Business. Ao acessar o site ou utilizar os serviços, você declara que leu, compreendeu e concorda com estas condições.`}
        >
            <h2 id="aceitacao">1. Aceitação</h2>
            <p>
                O uso do site e dos serviços da <strong>{COMPANY_NAME}</strong> implica
                aceitação integral destes Termos e da{' '}
                <Link href="/politica-de-privacidade">Política de Privacidade</Link>, que é
                parte inseparável deste documento. Caso não concorde com alguma condição,
                não utilize os serviços.
            </p>

            <h2 id="definicoes">2. Definições</h2>
            <ul>
                <li>
                    <strong>Serviços:</strong> criação de sites, identidade visual,
                    desenvolvimento web, além da implantação e operação de soluções de
                    atendimento e automação de mensagens.
                </li>
                <li>
                    <strong>Usuário:</strong> pessoa física ou jurídica que acessa o site ou
                    contrata os Serviços.
                </li>
                <li>
                    <strong>Contato final:</strong> pessoa que se comunica com o Usuário por
                    meio dos canais operados na Plataforma WhatsApp Business.
                </li>
                <li>
                    <strong>Plataforma Meta:</strong> serviços da Meta Platforms, Inc.,
                    incluindo a Plataforma WhatsApp Business e suas políticas para
                    desenvolvedores e empresas.
                </li>
            </ul>

            <h2 id="servicos">3. Descrição dos Serviços</h2>
            <p>
                A {COMPANY_NAME} desenvolve projetos digitais sob demanda e implanta
                integrações com a Plataforma WhatsApp Business, permitindo ao Usuário
                centralizar o atendimento, distribuir conversas entre atendentes e
                automatizar fluxos de mensagens. O escopo, os prazos e os valores de cada
                projeto são definidos em proposta comercial específica, que prevalece sobre
                estes Termos em caso de divergência pontual.
            </p>

            <h2 id="conta">4. Cadastro, conta e credenciais</h2>
            <ul>
                <li>
                    O Usuário se compromete a fornecer informações verdadeiras, completas e
                    atualizadas.
                </li>
                <li>
                    As credenciais de acesso são pessoais e intransferíveis. O Usuário é
                    responsável por todas as atividades realizadas com suas credenciais.
                </li>
                <li>
                    Suspeita de uso não autorizado deve ser comunicada imediatamente à{' '}
                    {COMPANY_NAME}.
                </li>
            </ul>

            <h2 id="whatsapp">5. Uso da Plataforma WhatsApp Business</h2>
            <p>
                O funcionamento das integrações depende de serviços fornecidos pela Meta. Ao
                utilizá-las, o Usuário reconhece e concorda que:
            </p>
            <ul>
                <li>
                    Está sujeito às políticas da Meta, incluindo os Termos da Plataforma
                    WhatsApp Business e a Política de Comércio, cujo descumprimento pode
                    resultar em limitação ou banimento do número pela própria Meta.
                </li>
                <li>
                    É <strong>obrigatório obter consentimento prévio (opt-in)</strong> dos
                    Contatos finais antes de enviar mensagens, bem como manter registro
                    dessa autorização e honrar pedidos de descadastramento (opt-out).
                </li>
                <li>
                    A {COMPANY_NAME} não controla a disponibilidade, as regras de qualidade,
                    os limites de envio, a tarifação por conversa nem as decisões de
                    moderação aplicadas pela Meta.
                </li>
                <li>
                    O Usuário é o <strong>controlador</strong> dos dados dos seus Contatos
                    finais e responde pela licitude das comunicações que dispara.
                </li>
            </ul>

            <h2 id="condutas-vedadas">6. Condutas vedadas</h2>
            <p>É expressamente proibido utilizar os Serviços para:</p>
            <ul>
                <li>
                    Enviar spam, mensagens em massa sem consentimento ou comunicações
                    enganosas.
                </li>
                <li>
                    Praticar fraude, phishing, engenharia social ou qualquer forma de
                    obtenção indevida de dados e credenciais.
                </li>
                <li>
                    Divulgar conteúdo ilícito, discriminatório, violento, difamatório, ou que
                    viole direitos de terceiros.
                </li>
                <li>
                    Comercializar produtos ou serviços proibidos pelas políticas da Meta ou
                    pela legislação brasileira.
                </li>
                <li>
                    Realizar engenharia reversa, copiar, revender ou sublicenciar os Serviços
                    sem autorização escrita.
                </li>
                <li>
                    Sobrecarregar, testar vulnerabilidades ou interferir na infraestrutura
                    sem autorização prévia e formal.
                </li>
            </ul>
            <p>
                A constatação de qualquer dessas condutas autoriza a suspensão imediata do
                acesso, sem prejuízo das medidas legais cabíveis.
            </p>

            <h2 id="obrigacoes">7. Obrigações do Usuário</h2>
            <ul>
                <li>
                    Utilizar os Serviços conforme a legislação vigente, em especial a LGPD, o
                    Marco Civil da Internet e o Código de Defesa do Consumidor.
                </li>
                <li>
                    Manter válidas as autorizações necessárias para tratar os dados dos seus
                    Contatos finais.
                </li>
                <li>
                    Fornecer, no prazo acordado, os conteúdos, acessos e aprovações
                    necessários à execução do projeto.
                </li>
                <li>Efetuar os pagamentos nas condições da proposta aceita.</li>
            </ul>

            <h2 id="pagamento">8. Valores e pagamento</h2>
            <p>
                Preços, forma de pagamento, reajustes e eventuais custos de terceiros (como
                a tarifação de conversas cobrada pela Meta, domínios e hospedagem) são
                definidos na proposta comercial. O atraso no pagamento pode ensejar a
                suspensão dos Serviços após comunicação prévia, sem prejuízo dos encargos
                contratuais.
            </p>

            <h2 id="propriedade-intelectual">9. Propriedade intelectual</h2>
            <p>
                A marca, o logotipo, o layout, os textos, o código-fonte e os demais
                elementos do site são de titularidade da {COMPANY_NAME} e protegidos pela
                Lei nº 9.610/1998 e pela Lei nº 9.279/1996. Os entregáveis produzidos sob
                encomenda são transferidos ao Usuário conforme o previsto na proposta, após
                a quitação integral. A {COMPANY_NAME} pode exibir os trabalhos aprovados em
                seu portfólio, salvo pedido de confidencialidade por escrito.
            </p>

            <h2 id="privacidade">10. Privacidade e proteção de dados</h2>
            <p>
                O tratamento de dados pessoais é descrito na{' '}
                <Link href="/politica-de-privacidade">Política de Privacidade</Link>. Quando
                a {COMPANY_NAME} atuar como operadora, tratará os dados apenas conforme as
                instruções documentadas do Usuário e adotará medidas de segurança
                compatíveis com o risco.
            </p>

            <h2 id="disponibilidade">11. Disponibilidade e suporte</h2>
            <p>
                Empregamos esforços para manter os Serviços disponíveis de forma contínua,
                mas não garantimos operação ininterrupta ou livre de falhas. Podem ocorrer
                interrupções por manutenção programada, eventos de força maior ou
                indisponibilidade de terceiros, incluindo a própria Meta. Sempre que
                possível, manutenções programadas serão comunicadas com antecedência.
            </p>

            <h2 id="responsabilidade">12. Limitação de responsabilidade</h2>
            <p>A {COMPANY_NAME} não se responsabiliza por:</p>
            <ul>
                <li>
                    Bloqueios, restrições ou banimentos aplicados pela Meta ao número ou à
                    conta do Usuário, especialmente os decorrentes de descumprimento das
                    políticas da plataforma.
                </li>
                <li>
                    Conteúdo das mensagens enviadas pelo Usuário e pelas consequências delas.
                </li>
                <li>
                    Indisponibilidade de serviços de terceiros, falhas de conexão ou eventos
                    de força maior.
                </li>
                <li>
                    Danos indiretos, lucros cessantes ou perda de oportunidade comercial.
                </li>
            </ul>
            <p>
                Nas hipóteses em que houver responsabilidade, ela fica limitada ao valor
                efetivamente pago pelo Usuário pelos Serviços objeto da controvérsia,
                ressalvadas as garantias legais inafastáveis.
            </p>

            <h2 id="rescisao">13. Suspensão e rescisão</h2>
            <p>
                Qualquer das partes pode encerrar a relação mediante aviso prévio, nos
                termos e prazos previstos na proposta comercial aceita. A {COMPANY_NAME}{' '}
                pode suspender ou encerrar o acesso de imediato em caso de violação destes
                Termos, das políticas da Meta ou da legislação. Encerrado o vínculo, o
                Usuário poderá solicitar a exportação dos dados sob sua controladoria,
                após o que os registros poderão ser eliminados conforme a{' '}
                <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
            </p>

            <h2 id="alteracoes">14. Alterações destes Termos</h2>
            <p>
                Estes Termos podem ser modificados a qualquer tempo. A versão vigente é
                sempre a publicada nesta página, identificada pela data de última
                atualização. O uso continuado dos Serviços após a publicação caracteriza
                concordância com a nova versão.
            </p>

            <h2 id="foro">15. Legislação aplicável</h2>
            <p>
                Estes Termos são regidos pelas leis da República Federativa do Brasil.
                Eventuais controvérsias serão dirimidas pelo foro competente nos termos da
                legislação aplicável.
            </p>

            <h2 id="contato">16. Contato</h2>
            <p>
                Dúvidas sobre estes Termos podem ser encaminhadas à {COMPANY_NAME} pelo
                WhatsApp{' '}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    {WHATSAPP_NUMBER}
                </a>
                .
            </p>
        </Legal>
    );
}
