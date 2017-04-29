import React from 'react'
import md from 'markdown-in-js'
import Router from 'next/router'
import Link from 'next/link'
import {css} from 'glamor'

import withData from '../lib/withData'
import mdComponents from '../lib/utils/mdComponents'
import {thousandSeparator} from '../lib/utils/formats'

import Frame from '../components/Frame'
import Content from '../components/Frame/Content'
import VideoCover from '../components/VideoCover'
import VideoPlayer from '../components/VideoPlayer'
import Share from '../components/Share'
import List, {Highlight} from '../components/List'
import {ListWithQuery as TestimonialList} from '../components/Testimonial/List'

import {
  PUBLIC_BASE_URL, STATIC_BASE_URL
} from '../constants'

import {
  Label, Button, Lead, colors,
  P, A, linkRule, Interaction
} from '@project-r/styleguide'

const styles = {
  mediaDiversity: css({
    margin: '20px 0',
    '& img': {
      width: 'calc(50% - 10px)',
      border: `1px solid ${colors.divider}`,
      margin: 5
    }
  }),
  stretchLead: css({
    margin: '20px -10px 0',
    backgroundColor: colors.primaryBg,
    padding: 10
  }),
  stretchP: css({
    fontSize: 17,
    lineHeight: '25px'
  })
}

const VIDEOS = {
  main: {
    hls: 'https://player.vimeo.com/external/213080233.m3u8?s=40bdb9917fa47b39119a9fe34b9d0fb13a10a92e',
    mp4: 'https://player.vimeo.com/external/213080233.hd.mp4?s=ab84df0ac9134c86bb68bd9ea7ac6b9df0c35774&profile_id=119',
    subtitles: '/static/subtitles/main.vtt',
    poster: `${STATIC_BASE_URL}/static/video/main.jpg`
  },
  team: {
    hls: 'https://player.vimeo.com/external/213078685.m3u8?s=09907679a29279449533845fa451ef9a3754da02',
    mp4: 'https://player.vimeo.com/external/213078685.hd.mp4?s=150318d6e82f1f342442340bade748be38280e61&profile_id=119',
    subtitles: '/static/subtitles/team.vtt',
    poster: `${STATIC_BASE_URL}/static/video/team.jpg`
  }
}

export default withData(({url}) => (
  <Frame url={url} meta={{
    pageTitle: 'Republik — das digitale Magazin von Project R',
    title: 'Republik — das digitale Magazin von Project R',
    description: 'Jetzt unser Crowdfunding unterstützen.',
    image: `${STATIC_BASE_URL}/static/social-media/main.jpg`
  }} cover={(
    <VideoCover src={VIDEOS.main} />
  )}>
    <div>
      <Content indented>
        <Lead>
          Willkommen zum Crowdfunding für das digitale Magazin Republik von Project&nbsp;R
        </Lead>
        {md(mdComponents)`
Die Republik ist eine kleine Rebellion. Für den Journalismus. Und gegen die Medienkonzerne. Denn die grossen Verlage verlassen die Publizistik: Sie bauen sich in hohem Tempo in Internet-Handelshäuser um. Das ist eine schlechte Nachricht für den Journalismus. Aber auch für die Demokratie. Denn ohne vernünftige Informationen fällt man schlechte Entscheidungen.

Eine funktionierende Demokratie braucht funktionierende Medien. Und dafür braucht es nicht nur Journalistinnen und Journalisten, sondern auch Sie. Als Leserinnen. Als Bürger. Als Menschen, die bereit sind, etwas Geld in unabhängigen Journalismus zu investieren.

[Jetzt mitmachen!](/pledge)


  `}

        <div style={{margin: '15px 0 0'}}>
          <Label style={{display: 'block', marginBottom: 5}}>
            Teilen Sie diese Seite mit Ihren Freunden:
          </Label>
          <Share
            url={PUBLIC_BASE_URL + url.pathname}
            emailSubject={'Es ist Zeit.'} />
        </div>
        {/* Navi? */}

        <div {...styles.stretchLead}>
          <Interaction.P {...styles.stretchP} style={{marginBottom: 10}}>
            Damit das digitale Magazin Republik an den Start gehen kann, haben wir 3000 Abonnentinnen und Abonnenten sowie 750{thousandSeparator}000 Franken gesucht. Dieses Ziel haben wir zusammen mit Ihnen am ersten Tag des Crowdfundings nach sieben Stunden und 49 Minuten erreicht. Herzlichen Dank!
          </Interaction.P>
          <Interaction.P {...styles.stretchP}>
            Republik will das Mediensystem entscheidend verändern — deshalb sammeln wir weiter!
          </Interaction.P>
          <List>
            <List.Item><Highlight>Bei 5000</Highlight> Unterstützerinnen und Unterstützern haben wir zwei weitere Ausbildungsplätze für junge Journalistinnen und Journalisten geschaffen.</List.Item>
            <List.Item><Highlight>Bei 7000</Highlight> Mitgliedern haben wir die Redaktion um einen zusätzlichen Kopf vergrössert.</List.Item>
            <List.Item><Highlight>Bei 9000</Highlight> Unterstützerinnen und Unterstützern realisieren wir pro Jahr zusätzlich vier grosse und aufwändige Recherchen. Gemeinsam mit euch haben wir das geschafft. Danke!</List.Item>
            <List.Item>Jetzt liegt das nächste Ziel in Reichweite: Bei <Highlight>10{thousandSeparator}000</Highlight> Abonnentinnen und Verlegern richten wir ein fixes Budget ein, um herausragende internationale Autorinnen und Autoren für die Republik zu gewinnen. Danke für eure Unterstützung!</List.Item>
          </List>
        </div>

        {md(mdComponents)`
<br />

# Worum es geht

Es ist Zeit, selbst Verantwortung zu übernehmen. Unsere Aufgabe dabei ist, eine zeitgemässe Form für den Journalismus zu entwickeln. Die Republik wird ein schlankes, schlagkräftiges Magazin im Netz. Mit dem Ziel, bei den grossen Themen, Fragen und Debatten Klarheit und Überblick zu bieten. Und das aufrichtig, ohne Schnörkel, mit grossem Herzen. Unser Ziel dabei ist, gemeinsam mit Ihnen ein neues Modell im Medienmarkt zu etablieren: kompromisslos in der Qualität, ohne Werbung, finanziert von den Leserinnen und Lesern. Es ist Zeit für Journalismus ohne Bullshit.

Bis jetzt haben Investorinnen und Spender rund 3,5 Millionen Franken zugesagt. Die Zahlung der Gelder ist aber an eine Bedingung geknüpft: den Test, ob das Publikum das neue Magazin auch will. Dazu dient dieses Crowdfunding. Wir brauchen mindestens 3000 zukünftige Leserinnen und Leser, die bereit sind, Republik zu abonnieren. Und wir müssen mindestens 750\u2009000 Franken zusammenbekommen.

Schaffen wir beide Ziele, zahlen die Investoren. Und die Entwicklung der Republik ist für fast zwei Jahre gesichert. Scheitern wir, fliesst kein Franken. Wir schliessen unser Unternehmen. Und Sie erhalten Ihren Beitrag zurück.

Entscheiden Sie sich, mitzumachen, werden Sie Abonnentin. Sie erhalten ab Anfang 2018 ein Jahr lang die Republik. Plus vergünstigten Zugang zu allen Veranstaltungen. Ausserdem werden Sie automatisch ein Teil des Unternehmens – als Mitglied der Project R Genossenschaft. Kurz, Sie werden ein klein wenig Verleger der Republik. Und haben dadurch auch die Privilegien einer Verlegerin: etwa den Einblick in alle wichtigen Entscheide der Redaktion. Damit machen Sie übrigens kein schlechtes Geschäft: Denn für jedes Abonnement, in das Sie für den Start der Republik investieren, riskieren die grossen Investorinnen und Investoren 1118.40 Franken zusätzlich.

Ihr Risiko beträgt dabei 240 Franken pro Jahr. Also der Preis, den man pro Jahr wöchentlich für einen Kaffee im Restaurant ausgibt.

Mit diesem Betrag können Sie einen echten Unterschied machen. Denn es ist Zeit, dem Journalismus ein neues Fundament zu bauen. Und das schafft niemand allein. Sondern nur viele gemeinsam: wir mit Ihnen. Willkommen an Bord!

[Jetzt mitmachen!](/pledge)


# Wer wir sind

Ihre Partnerin bei diesem Projekt ist die Aufbaucrew der Republik und von Project R. Wir sind seit drei Jahren an der Arbeit, zuerst lange in Nachtarbeit, seit Januar 2017 hauptberuflich. Mittlerweile besteht die Crew aus fast einem Dutzend Journalisten, Start-up-, Kommunikations-, Organisations- und IT-Spezialistinnen. (Und einigen Dutzend Komplizen und Beraterinnen im Hintergrund.)
  `}

        <P>
          Die Kurzporträts der Crew finden Sie
          {' '}
          <Link href='/crew'><a {...linkRule}>hier</a></Link>.
          {' '}
          Und dazu im Video die Lesung unseres <A href='/manifest' target='_blank'>Manifests</A> zur Gründung der Republik:
        </P>

        <div style={{marginBottom: 40, marginTop: 10}}>
          <VideoPlayer src={VIDEOS.team} />
        </div>

        {md(mdComponents)`
# Warum wir es&nbsp;tun

Das Problem der traditionellen Medien ist, dass ihr Geschäftsmodell zusammengebrochen ist. Über ein Jahrhundert lang waren Zeitungsverlage praktisch Gelddruckmaschinen mit enormer Rendite: Man verkaufte Nachrichten an die Leserinnen und Leser – und die Leserinnen und Leser an die Werbung.

Doch das ist Geschichte. Denn die Inserate sind ins Netz verschwunden. Und die grossen Verlage folgen dem Geschäft. Die Gewinne machen heute die Suchmaschinen: für Jobs, Autos, Immobilien, Liebe. Nur brauchen Suchmaschinen keine Leitartikel mehr auf der Rückseite. Verlage wie Tamedia, Ringier – oder in Deutschland Springer – verlassen deshalb die Publizistik. Ihr Geld, ihre Ideen, ihre Planung investieren sie in das neue Geschäft. Redet man mit Leuten der Chefetage, ist es längt keine Frage mehr, ob Journalismus noch zum Geschäft von morgen gehört. Er tut es nicht. Ihre Zukunft sehen die Medienkonzerne als Schweizer Amazon.

Bis es so weit ist, wird die sterbende Cashcow noch so lange wie möglich gemolken. Investitionen fliessen kaum mehr in den Journalismus; bei eigenen Medien wird nur noch gespart. Dazu wird fusioniert, was geht. Kleinere Zeitungen werden zwecks Reichweite eingekauft. Und verdaut. Bereits heute beherrschen Tamedia, NZZ und Ringier zusammen 80 Prozent der veröffentlichten Meinung.

`}

        <div {...styles.mediaDiversity}>
          <img
            alt='«Amokfahrer rast in Menschen in London» bazonline.ch am 22. März 2017 um 16 Uhr'
            src={`${STATIC_BASE_URL}/static/index/baz.png`} />
          <img
            alt='«Amokfahrer rast in Menschen in London» tagesanzeiger.ch am 22. März 2017 um 16 Uhr'
            src={`${STATIC_BASE_URL}/static/index/ta.png`} />
          <img
            alt='«Amokfahrer rast in Menschen in London» derbund.ch am 22. März 2017 um 16 Uhr'
            src={`${STATIC_BASE_URL}/static/index/bund.png`} />
          <img
            alt='«Amokfahrer rast in Menschen in London» bernerzeitung.ch am 22. März 2017 um 16 Uhr'
            src={`${STATIC_BASE_URL}/static/index/bz.png`} />
        </div>

        {md(mdComponents)`

Auch ohne weitere Deals verflacht der Journalismus. Denn in der Krise fusionieren die grossen Verlage ihre Medien zu riesigen Klumpen. Beim «Tages-Anzeiger» etwa werden die schnellen News mit «20 Minuten» gemacht, die Bundeshaus-Berichterstattung kommt vom «Bund», Ausland, Wirtschaft und Kultur liefert zu immer grösseren Teilen die «Süddeutsche Zeitung», zu kleinen Teilen die «Basler Zeitung», die hinteren Bünde sind mit der «SonntagsZeitung» zusammengelegt worden. Und gedruckt wird mit der NZZ.

Kurz: Es ist das Organigramm von Frankensteins Monster. Zwar hat die Zeitung noch hervorragende Journalisten und Artikel, als Zeitung ist sie aber so gut wie unsteuerbar. Und sie ist keineswegs allein. Ringier hat die gesamte «Blick»-Gruppe zusammengeschmolzen, die NZZ ihre Regionalzeitungen. Ökonomisch machen diese Fusionen zwar Sinn, für die Öffentlichkeit aber sind sie ein Problem. Denn mit dem Zusammenschmelzen wird die Identität der Blätter vernichtet, ihre Kompetenz, ihre Tradition. Und in der politischen Debatte verfällt die Meinungsvielfalt: Mit den Fusionen verarmt der Wettbewerb an Standpunkten, Ideen, Blickwinkeln.

## Comeback der Parteipresse

Stattdessen erlebt die rechte Parteipresse ein Comeback. Im Frühling 2002 übernahm eine Gruppe von Rechtsbürgerlichen um Financier Tito Tettamanti die «Weltwoche». Acht Jahre später kauften fast exakt dieselben Leute die «Basler Zeitung». Nach langem Versteckspiel stellte sich SVP-Milliardär Christoph Blocher als der wahre Käufer heraus.

In der Schweiz wiederholt sich damit die gleiche Geschichte wie in den USA: Mit sinkenden Einnahmen werden Medien zum Spielzeug für Milliardäre. Statt Umsatzrendite wollen sie Einfluss: eine politische Dividende. Das ist kein gutes Zeichen für die Demokratie. Denn die Ballung von Kapital, Medienmacht und Politik ist ein klassisches Merkmal der Oligarchie.

In den USA führten die Medien-Investments von Milliardären dazu, dass sich das Mediensystem radikal in zwei Lager spaltet. Und heute nicht mehr unterschiedliche Blickwinkel auf die Wirklichkeit vermittelt, sondern zwei komplett verschiedene Wirklichkeiten. Die Amerikaner leben in zwei Paralleluniversen, nicht nur mit verschiedenen Meinungen, sondern mit komplett verschiedenen Fakten. Kein Wunder, radikalisierte sich die Gesellschaft. Und Donald Trump kam in seinem Universum mit allen Lügen durch. Die Spaltung der Welt gebiert Monster.

In der Schweiz könnte das System noch absurder ausfallen. Deshalb, weil nur noch ein einziger Käufer von Medientiteln auf dem Markt ist: Christoph Blocher. Mit der Tamedia AG stand er zweimal kurz vor einem Geschäftsabschluss – zuerst mit dem Kauf der «SonntagsZeitung», später mit dem Tausch der «Basler Zeitung» gegen die Zürcher Landzeitungen plus der «Berner Zeitung». Beide Deals scheiterten nur knapp an einem Veto im Tamedia-Verwaltungsrat.

Auch die NZZ wird von ganz rechts bedrängt. 2014 kauften SVP-Strohmänner massiv NZZ-Aktien. Der Druck wirkte. Der freisinnige NZZ-Verwaltungsrat wählte den Blocher-Biografen Markus Somm zum Chefredaktor. Erst nach massiven Protesten aus Redaktion und Leserschaft wurde Somm fallen gelassen. Aber nicht sein Kurs. Auch ohne ihn driftet die NZZ entschlossen nach rechts.

Diesen Frühling haben SVP-Kreise ein Kaufangebot für die gesamte «Blick»-Gruppe gemacht. Dazu droht Blocher den Verlegern mit der Lancierung einer Gratis-Sonntagszeitung. Und lässt in Basel bereits eine Druckmaschine bauen.

Kurz: Die flächendeckende Übernahme der Schweizer Medien durch den Chef der grössten Schweizer Partei ist kein unplausibles Szenario. Kein Wunder, schiesst die SVP mit allen Mitteln gegen die SRG. Sie wäre dann die letzte verbliebene Konkurrentin auf dem Meinungsmarkt.

## Pervertierter Journalismus

Doch selbst wenn sich nichts ändert, ist das Schweizer Mediensystem alles andere als in Form, um seinen Job als Wachhund der Demokratie wahrzunehmen. Denn die zwei politisch folgenreichsten Innovationen der Schweizer Medien im vergangenen Jahrzehnt sind alles andere als förderlich für die Öffentlichkeit.

**Innovation Nummer 1: Die Doppelzange**. Eine Person, die Differenzen mit Christoph Blocher hat, gerät doppelt ins Schussfeld. Sie bekommt nicht nur Ärger mit der grössten Partei. Sondern wird auch in der «Weltwoche» und der «Basler Zeitung» angegriffen. Die Doppelzange ist ein ebenso neues wie wirksames Disziplinierungsinstrument in der Schweizer Politik – nicht zuletzt für unabhängige Köpfe im bürgerlichen Lager. Und sogar in der SVP selbst.

**Innovation Nummer 2: Die kleine Empörungsgeschichte**. Sie entsteht aus der Logik des Internet-Journalismus. Eine ideale Geschichte für schnelle Onlineportale muss folgende Merkmale haben: Sie muss schnell produzierbar sein, dazu leicht verständlich, möglichst viele Reaktionen auslösen und fortsetzbar sein. Die kleine Empörungsgeschichte erfüllt diese Vorgaben nahezu ideal: Eine SP-Nationalrätin raucht im Rauchverbot, ein SVP-Nationalrat beschäftigt eine Asylbewerberin als Putzkraft, ein jugendlicher Gewalttäter erhält eine teure Therapie. Kaum ist die Story erschienen, springt die Konkurrenz auf. Und dann rollt eine flächendeckende Walze: Empörte Leserkommentare, Expertenmeinungen, Verteidigungen der Angeschuldigten, Rücktrittsforderungen, Pressekonferenzen mit Live-Tickern, und am Ende mahnen die Medienwissenschaftler. Sollte irgendwann in der Zukunft eine Historikerin zu bestimmen versuchen, was das bedeutendste Ereignis in der Schweizer Politik der letzten Jahre war, käme sie – rein quantitativ – zum Schluss, dass es mit mehreren Tausend Artikeln die Geschichte eines grünen Nationalrats gewesen sein musste, der einer Bekannten privat ein Bild seines Penis schickte.

Das Resultat der kleinen Empörungsgeschichte ist mehr als nur Zeitverschwendung. Nach dem «Fall Carlos» etwa, dem Jugendlichen mit der teuren Therapie, mussten die Jugendarbeiter im Kanton Aargau aus Furcht vor Medienanfragen ihre Dossiers rückwirkend neu begründen. Und alle Fälle unartiger Jugendlicher gingen ab sofort über den Tisch des Regierungsrats. Statt dass man sagte: «Du dumme Siech hast Seich gemacht, jetzt gehst du zwei Wochen auf die Alp und denkst nach!» – wurde nun aus jeder Dummheit ein Verwaltungsakt.

Der Job der Medien wäre, für freiere Köpfe und schlankere Lösungen zu sorgen. Die Doppelzange und die kleine Empörungsgeschichte bewirken das exakte Gegenteil. Ihr Produkt ist: mehr Angst. Und mehr Bürokratie.

Kurz: Es ist Zeit für etwas Neues. Unsere Pläne für die Republik finden Sie gleich als Nächstes. Den Link zum Republik-Manifest von Project R [hier](/manifest). Und den Link, um sofort mitzumachen, hier: [Jetzt mitmachen!](/pledge)

  `}

        {/* Manifest? */}

        {md(mdComponents)`
<br />

![Das Manifest hängt am Balkon des Hotel Rothaus](/static/index/rothaus_manifest.jpg)

# Was wir versprechen

Die Republik wird ein Magazin für die öffentliche Debatte – für Politik, Wirtschaft, Gesellschaft. Ihr Job ist alles, was unklar, lärmig, verwickelt ist. Wir sehen uns als Service. Während Sie ein vernünftiges Leben führen – mit Familie, Job, Hobby –, arbeiten wir uns durch den Staub der Welt. Und liefern Ihnen das Wesentliche. Mit Ihrem Abonnement finanzieren Sie sich quasi ein privates Expeditionsteam in die Wirklichkeit.

Die Produkte unseres Magazins werden entweder sehr kurz oder lang sein: Sie bekommen das Konzentrat – oder die ganze Geschichte. Um das zu erreichen, werden wir anders arbeiten als die herkömmlichen Medien:

1. Da wir als kleinere Crew gegen weit grössere Redaktionen antreten, bleibt uns nichts als Konzentration: Wir dürfen nichts machen als das Wichtige. Aber dieses müssen wir gross machen, gross in der Recherche, im Blick, in der Aufmachung – und grosszügig in der Haltung: So, als hätte die Schweiz Anschluss ans Meer.
2. Da wir uns konzentrieren müssen, werden wir auf Halbes, Halbgutes, Halbgedachtes, Halblanges, kurz: auf Bullshit verzichten. Wir werden Sie nicht mit Unfertigem belästigen.
3. Unser Ziel ist ein komplett anderes als das der traditionellen Medien. Das Ziel einer traditionellen Zeitung ist die Abarbeitung der täglichen Agenda, das Ziel eines traditionellen Onlineportals sind Reichweite und Klicks. Wir, als leserfinanziertes Medium, haben keine andere Wahl, als Sie zu überzeugen. Denn ohne Überzeugung zahlen Sie nicht. Bei unseren Texten werden die Autoren leiden, nicht die Leserinnen.

## Die Redaktion

Die Redaktion, die das leisten muss, wird aus sehr verschiedenen Leuten bestehen. Wir wollen sie nach Alter, Herkunft, Fähigkeiten möglichst gemixt. Und fifty-fifty nach Geschlecht. Das erscheint uns das beste Gegengift gegen blinde Flecken. Wichtig sind uns im Unternehmen die enge Verzahnung von Journalismus, IT und Verlag. Und bei unseren Angestellten Können, Leidenschaft, Mut. Denn wenn wir unseren Job schlecht machen, gibt es keine Ausrede. Unser einziges Produkt ist vernünftiger Journalismus. Wir haben keine Ablenkung durch ein Tagesgeschäft mit News. Und unser einziger Kunde sind Sie. Wir verzichten auf jedes Nebengeschäft mit Werbung.

Sobald Sie ein Abonnement kaufen, werden Sie ein klein wenig Besitzer oder Besitzerin des Unternehmens. Sie sind Mitglied der Project R Genossenschaft, die das grösste Aktienpaket an der Republik hält. Damit erhalten Sie Einladungen zu Veranstaltungen, Einblick in die Entscheidungen der Redaktion und freien Zugang zum Magazin. Und haben die Möglichkeit, jeden Artikel im Netz mit Freunden zu teilen.

Die Artikel sind teilbar, weil wir Wirkung auf die politische Debatte wollen. Die Republik ist politisch nicht festgelegt, aber keineswegs neutral: Sie steht für die Verteidigung der Institutionen der Demokratie – wie etwa des Rechtsstaates – gegen den Vormarsch der Autoritären. Sie steht gegen die Diktatur der Angst. Und für die Werte der Aufklärung: für Klarheit im Stil, für Treue zu Fakten, für Lösungen von Fall zu Fall, für Offenheit gegenüber Kritik, für Respektlosigkeit vor der Macht und Respekt vor dem Menschen, für die Freiheit des Einzelnen und aller seiner Gedanken.

## Ein neues Modell

Es ist uns klar, dass unsere Aufgabe aus mehr als nur Worten besteht. Dass nicht nur einzelne Recherchen, Enthüllungen oder Essays zählen, sondern dass wir ein funktionierendes Unternehmen bauen müssen. Eines, das auf dem Markt besteht und mindestens selbsttragend wird. Denn es geht uns nicht nur um unsere Vorstellung von Journalismus, es geht uns nicht zuletzt um die Institution des Journalismus. Die Demokratie braucht freie Medien; die Medien brauchen ein neues Geschäftsmodell. Wir wissen um das Risiko. Und wir wissen um unsere Verantwortung. Und haben deshalb die Start-up-, Organisations- und Finanzprofis an Bord geholt, um vernünftig zu wirtschaften.

![](/static/index/vernetzt.jpg)

Last, not least ist die Republik ausbaufähig. Wir wünschen der Konkurrenz nur das Beste. Aber sollten die Zeitungen weiter ins Graue gespart oder an politische Akteure verkauft werden, können wir das Projekt ausbauen: in Richtung Feuilleton, in Richtung Lokalredaktionen oder Romandie. Oder wohin immer es nötig ist. Wir sind unabhängig von Verlegern, Börse und Werbung. Und wir werden das nutzen. Unsere Verpflichtung gilt niemandem ausser unseren Leserinnen und Lesern. Denn wir gehören keinem Verlag, machen keine Werbung. Wir gehören nur – ein wenig – Ihnen.

So weit unser Versprechen. Jetzt ist es Zeit für Ihre Entscheidung.

Willkommen an Bord!

  `}

        <Button primary onClick={() => {
          Router.push('/pledge')
        }} style={{minWidth: 300}}>
          Jetzt mitmachen!
        </Button>

        <div style={{margin: '15px 0 40px'}}>
          <Label style={{display: 'block', marginBottom: 5}}>
            Jetzt andere auf die Republik aufmerksam machen:
          </Label>
          <Share
            url={PUBLIC_BASE_URL + url.pathname}
            emailSubject={'Es ist Zeit.'} />
        </div>

        {md(mdComponents)`
# Community

Die Republik kann nicht ein Projekt von wenigen sein. Ein neues Fundament für unabhängigen Journalismus bauen wir nur gemeinsam – oder gar nicht. Sehen Sie hier, wer schon an Bord ist:
  `}
        <div style={{margin: '20px 0'}}>
          <TestimonialList limit={10} onSelect={(id) => {
            Router.push(`/community?id=${id}`).then(() => {
              window.scrollTo(0, 0)
            })
            return false
          }} />
        </div>

        {md(mdComponents)`
[Alle ansehen](/community)
  `}
      </Content>
    </div>
  </Frame>
))
