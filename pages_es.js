// Spanish page builder
// Depends on model.js being loaded first

function mkPage(id,active,html){return`<div class="page${active?' active':''}" id="pg-${id}">${html}</div>`;}
function scLabel(k){return lang==='es'?SC[k].labelES:SC[k].label;}
function pill(k,active){return`<button class="pill${active?' active':''}" data-sc="${k}" onclick="loadSc('${k}')">${scLabel(k)} - ${(SC[k].mi/1000).toFixed(0)}k/${lang==='es'?'año':'yr'}</button>`;}

function buildPagesES(){return[
// INICIO
mkPage('home',true,`<div class="ph" style="min-height:38vh;display:flex;flex-direction:column;justify-content:flex-end">
  <div class="ph-label">Universidad de Fordham · Primavera de 2026</div>
  <h1>Índice de<br>Estabilidad Urbana</h1>
  <p>Un modelo matemático del papel de la inmigración en el futuro demográfico de Nueva York. Desarrollado como tesis de honor en matemáticas, ciencias computacionales y español.</p>
</div>
<div class="pc">
  <div class="stat-row">
    <div class="stat-cell"><div class="sv">3,1M</div><div class="sl">Residentes nacidos en el extranjero en NYC</div><div class="ss">ACS 2023 · 36,8% de la población</div></div>
    <div class="stat-cell"><div class="sv">44,3%</div><div class="sl">Proporción de la fuerza laboral nacida en el extranjero</div><div class="ss">2,38 veces el promedio nacional</div></div>
    <div class="stat-cell"><div class="sv">$103B</div><div class="sl">Impuestos pagados por inmigrantes anualmente</div><div class="ss">Área metropolitana · American Immigration Council 2023</div></div>
    <div class="stat-cell"><div class="sv" id="home-usi" style="color:var(--orange)">+0.05</div><div class="sl">IEU actual, cerca de cero</div><div class="ss">Bajo la trayectoria de aplicación actual</div></div>
  </div>
  <div class="g2" style="margin-bottom:24px">
    <div>
      <h2>De qué trata este proyecto</h2>
      <p>Nueva York nunca ha crecido por su cuenta. Cada año salen más personas hacia otros estados de las que se ganan por el exceso de nacimientos sobre defunciones. La inmigración internacional es lo que mantiene la población de la ciudad, y así ha sido durante décadas.</p>
      <p>Esta tesis cuantifica esa relación con datos de la Oficina del Censo y proyecta lo que ocurriría con la población, la fuerza laboral y la vivienda de NYC bajo cuatro escenarios distintos de política migratoria federal.</p>
      <button onclick="goPage('argument')" style="margin-top:6px;padding:9px 18px;background:var(--accent);color:var(--bg);border:none;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Crimson Pro',serif">Leer el argumento</button>
    </div>
    <div>
      <div class="callout"><p>Bajo la política actual, la migración internacional neta ha caído a <strong>66.000/año</strong>, apenas por encima del umbral de equilibrio de <strong>56.612</strong>. El IEU es efectivamente <strong>cero</strong>.</p></div>
      <div class="meter-wrap">
        <div class="meter-title">Dónde se sitúa la política actual respecto al umbral de equilibrio</div>
        <div class="meter-track"><div class="meter-fill" id="hMFill" style="width:0%"></div><div class="meter-thresh" id="hMThresh" style="left:22.6%"><span>Equilibrio: 56.612</span></div></div>
        <div class="meter-labels"><span>0</span><span style="color:var(--red)">← Declive</span><span style="color:var(--green)">Crecimiento →</span><span>250k</span></div>
        <div class="meter-status" id="hMStatus" style="background:rgba(245,166,35,.07);color:var(--orange)">66.000 llegadas/año, 9.388 por encima del umbral de equilibrio.</div>
      </div>
    </div>
  </div>
  <div class="g3">
    <button onclick="goPage('model')" class="card" style="cursor:pointer;text-align:left"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:8px;font-weight:600">El modelo</div><div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:5px">Fórmula IEU</div><div style="font-size:12px;color:var(--text3)">Cómo se combinan población, trabajo y vivienda en un solo número</div></button>
    <button onclick="goPage('scenarios')" class="card" style="cursor:pointer;text-align:left"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:8px;font-weight:600">Escenarios</div><div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:5px">Cuatro trayectorias de política</div><div style="font-size:12px;color:var(--text3)">Proyecciones desde alta inmigración hasta restricción sostenida</div></button>
    <button onclick="goPage('map')" class="card" style="cursor:pointer;text-align:left"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:8px;font-weight:600">Mapa + Datos</div><div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:5px">Mapa interactivo</div><div style="font-size:12px;color:var(--text3)">IEU por distrito comunitario, con proyecciones por escenario</div></button>
  </div>
</div>`),
// ARGUMENTO
mkPage('argument',false,`<div class="ph">
  <div class="ph-label">El argumento</div>
  <h1>Por qué la inmigración es<br>la variable determinante</h1>
  <p>Nueva York registra más nacimientos que defunciones cada año. El problema demográfico es otra cosa.</p>
</div>
<div class="pc">
  <div class="g2" style="margin-bottom:32px">
    <div>
      <h2>Lo que muestran los datos</h2>
      <p>El crecimiento natural de NYC es positivo: aproximadamente 89.851 nacimientos frente a 55.224 defunciones en 2023-24, una ganancia de 34.627. El problema es que 91.239 residentes se mudaron a otros estados ese mismo año, eliminando esa ganancia y algo más.</p>
      <p>La inmigración internacional añadió 144.098 personas, cubrió la salida doméstica y produjo un aumento neto de población de 87.184. Sin ella, la ciudad habría perdido 56.612 residentes a pesar de tener más nacimientos que defunciones.</p>
      <div class="callout"><p>La aritmética es directa: las pérdidas domésticas menos el crecimiento natural dejan una brecha de 56.612 personas al año que solo las llegadas internacionales pueden cubrir.</p></div>
    </div>
    <div class="card" style="overflow-x:auto">
      <h3 style="margin-bottom:14px">Componentes de Población NYC · 2023–2024</h3>
      <table class="dt">
        <thead><tr><th>Componente</th><th>Valor</th></tr></thead>
        <tbody>
          <tr><td>Nacimientos anuales</td><td>89.851</td></tr>
          <tr><td>Muertes anuales</td><td>55.224</td></tr>
          <tr><td>Crecimiento natural</td><td class="pos">+34.627</td></tr>
          <tr><td>Migración doméstica neta</td><td class="neg">−91.239</td></tr>
          <tr><td>Migración internacional neta</td><td class="pos">+144.098</td></tr>
          <tr><td>Cambio total de población</td><td class="pos">+87.184</td></tr>
          <tr><td>Población julio 2023</td><td>8.204.035</td></tr>
          <tr><td>Migración actual (2025)</td><td class="neu">66.000</td></tr>
        </tbody>
      </table>
      <div class="footnote">NYC DCP, Estimaciones de Población, mayo 2025, Apéndice A, Tabla 2</div>
    </div>
  </div>
  <h2>El umbral de equilibrio</h2>
  <p>El número mínimo de llegadas internacionales netas necesarias para evitar la pérdida de población es 56.612 al año. Esa cifra resulta de restar el crecimiento natural (34.627) de la salida doméstica (91.239). Con la trayectoria de aplicación actual, las llegadas netas han caído a unos 66.000, apenas 9.388 por encima de ese umbral.</p>
  <div class="meter-wrap">
    <div class="meter-title">Migración internacional neta vs. umbral de equilibrio</div>
    <div class="meter-track"><div class="meter-fill" id="mFill" style="width:0%"></div><div class="meter-thresh" id="mThresh" style="left:22.6%"><span>Equilibrio: 56.612</span></div></div>
    <div class="meter-labels"><span>0 llegadas/año</span><span style="color:var(--red)">← Declive</span><span style="color:var(--green)">Crecimiento →</span><span>250.000/año</span></div>
    <div class="meter-status" id="mStatus" style="background:rgba(245,166,35,.07);color:var(--orange)">Política actual: 66.000/año, 9.388 por encima del umbral de equilibrio.</div>
  </div>
  <div class="footnote">Greg David, "Immigration to NYC Plummeted as Trump Crackdown Took Hold," The CITY, 26 de marzo de 2026, citando el Census Bureau Vintage 2025.</div>
</div>`),
// MODELO
mkPage('model',false,`<div class="ph">
  <div class="ph-label">El modelo</div>
  <h1>Índice de Estabilidad Urbana</h1>
  <p>Tres ecuaciones cubren población, fuerza laboral y presión sobre la vivienda. Cada una produce una tasa de crecimiento, y las tres se combinan en un índice ponderado único. Una puntuación de cero significa que la ciudad se mantiene estable.</p>
</div>
<div class="pc">
  <div class="g2" style="margin-bottom:16px">
    <div class="card">
      <h3>I. Modelo de Población</h3>
      <div class="eqbox"><div class="eqlabel">Ecuación diferencial</div>$$\\frac{dP}{dt} = B(t) - D + M \\qquad B(t) = b_i P_i + b_n P_n$$$$S_p = \\frac{P(t_f) - P(t_0)}{P(t_0)} \\times 10$$</div>
      <table class="dt"><thead><tr><th>Variable</th><th>Definición</th><th>Valor</th></tr></thead><tbody><tr><td>P(t₀)</td><td>Población julio 2023</td><td>8.204.035</td></tr><tr><td>bₙ / bᵢ</td><td>Tasas de natalidad nativo/inmigrante</td><td>1,24% / 1,39%</td></tr><tr><td>Mᵢ / Mᵈ</td><td>Migración intl. / doméstica</td><td class="pos">+144.098 / <span class="neg">−91.239</span></td></tr></tbody></table>
    </div>
    <div class="card">
      <h3>II. Modelo de Fuerza Laboral</h3>
      <div class="eqbox"><div class="eqlabel">Composición laboral</div>$$L(t) = E_i \\cdot W_i + E_n \\cdot W_n$$$$S_l = \\frac{L(t_f) - L(t_0)}{L(t_0)} \\times 10$$<div class="eqnote">Nuevos inmigrantes entran al 70% de participación laboral; emigrantes domésticos salen al 64%</div></div>
      <table class="dt"><thead><tr><th>Variable</th><th>Valor</th></tr></thead><tbody><tr><td>Wᵢ (trabajadores extranjeros)</td><td>1.800.000 (44,3%)</td></tr><tr><td>Wₙ (trabajadores nativos)</td><td>2.263.000 (55,7%)</td></tr><tr><td>Eᵢ / Eₙ (tasas de participación)</td><td>68% / 63%</td></tr></tbody></table>
    </div>
  </div>
  <div class="card" style="margin-bottom:16px">
    <h3>III. Modelo de Presión sobre la Vivienda</h3>
    <div class="eqbox">$$H(t) = \\frac{P_i(t) + P_n(t)}{U(t)} \\qquad H(2023) \\approx 2{,}23$$$$S_H = \\frac{H(t_f) - H(2023)}{H(2023)} \\times 10$$<div class="eqnote">U crece +22.000 unidades/año · S_H positivo = mayor densidad = penalización en el IEU</div></div>
  </div>
  <h2 style="margin-bottom:12px">De dónde vienen los pesos</h2>
  <p style="margin-bottom:16px">Cada peso refleja la participación medida de la inmigración en esa dimensión. Las tres cifras brutas (80,6, 44,3, 25,0) se normalizan para sumar 1,0 dividiendo cada una entre su total de 149,9.</p>
  <div class="g3" style="margin-bottom:16px">
    <div class="wcard"><div class="wcard-num">0,54</div><div class="wcard-dim">wₚ — Población</div><div class="wcard-desc">En 2023-24, la inmigración internacional representó el 80,6% de todos los aportes positivos de población: 144.098 de (144.098 + 34.627). Esa proporción se normaliza a 0,54.</div><div class="wcard-src">80,6 / 149,9 = 0,54 · Census Vintage 2024</div></div>
    <div class="wcard"><div class="wcard-num">0,30</div><div class="wcard-dim">wₗ — Fuerza laboral</div><div class="wcard-desc">Los trabajadores nacidos en el extranjero representan el 44,3% de la fuerza laboral de NYC, más del doble del promedio nacional del 18,6%. Los inmigrantes son desproporcionadamente jóvenes y tienen tasas de participación más altas.</div><div class="wcard-src">44,3 / 149,9 = 0,30 · Contralor del Estado de NY 2024</div></div>
    <div class="wcard"><div class="wcard-num">0,17</div><div class="wcard-dim">wₕ — Vivienda (penalización)</div><div class="wcard-desc">Los hogares inmigrantes representaron el 25% de la formación de hogares en EE.UU. entre 2019 y 2023. Dado que el aumento de densidad es un costo, este componente se resta en lugar de sumarse.</div><div class="wcard-src">25,0 / 149,9 = 0,17 · Harvard JCHS 2024</div></div>
  </div>
  <div class="card" style="text-align:center;border-color:rgba(232,197,71,.2)">
    <div class="eqbox" style="border:none;background:transparent;padding:6px 0 0;margin:0"><div class="eqlabel" style="text-align:center">El Índice de Estabilidad Urbana · escalado ×10</div>$$\\text{IEU} = \\underbrace{5{,}4}_{\\mathclap{w_p}} \\cdot S_p \\;+\\; \\underbrace{3{,}0}_{\\mathclap{w_l}} \\cdot S_l \\;-\\; \\underbrace{1{,}7}_{\\mathclap{w_h}} \\cdot S_H$$<div class="eqnote">IEU &gt; 0 = crecimiento &nbsp;·&nbsp; IEU = 0 = estasis &nbsp;·&nbsp; IEU &lt; 0 = declive</div></div>
  </div>
</div>`),
// ESCENARIOS
mkPage('scenarios',false,`<div class="ph">
  <div class="ph-label">Escenarios</div>
  <h1>Cuatro niveles de inmigración,<br>cuatro resultados</h1>
  <p>La emigración doméstica y el crecimiento natural se mantienen constantes en los cuatro escenarios. Solo cambia la migración internacional neta anual.</p>
</div>
<div class="pc">
  <div class="pills" id="scenPills">${['high','pre2025','current','restrict'].map((k,i)=>pill(k,i===1)).join('')}</div>
  <div class="g4" id="compGrid" style="margin-bottom:20px"></div>
  <div style="margin-bottom:18px">
    <div class="tab-row">
      <button class="tb active" onclick="filterScen('all',this)">Todos</button>
      <button class="tb" onclick="filterScen('high',this)">Alta</button>
      <button class="tb" onclick="filterScen('pre2025',this)">Pre-2025</button>
      <button class="tb" onclick="filterScen('current',this)">Actual</button>
      <button class="tb" onclick="filterScen('restrict',this)">Restrictiva</button>
    </div>
    <div class="card" style="border-radius:0 0 10px 10px;border-top:none;overflow-x:auto">
      <table class="dt" id="scenTable">
        <thead><tr><th>Métrica</th><th class="col-high">Alta</th><th class="col-pre2025">Pre-2025</th><th class="col-current">Actual ⁴</th><th class="col-restrict">Restrictiva</th></tr></thead>
        <tbody>
          <tr><td>Migración intl. neta/año</td><td class="col-high">200.000</td><td class="col-pre2025">144.098</td><td class="col-current">66.000</td><td class="col-restrict">20.000</td></tr>
          <tr><td>Migración total neta/año</td><td class="col-high pos">+108.761</td><td class="col-pre2025 pos">+52.859</td><td class="col-current neg">−25.239</td><td class="col-restrict neg">−71.239</td></tr>
          <tr><td>Población 2034</td><td class="col-high">9.637.915</td><td class="col-pre2025">9.078.895</td><td class="col-current">8.297.915</td><td class="col-restrict">7.837.915</td></tr>
          <tr><td>Fuerza laboral 2034</td><td class="col-high">4.879.070</td><td class="col-pre2025">4.487.756</td><td class="col-current">3.941.070</td><td class="col-restrict">3.619.070</td></tr>
          <tr><td>Sₚ crecimiento 10 años</td><td class="col-high pos">+17,48%</td><td class="col-pre2025 pos">+10,66%</td><td class="col-current pos">+1,14%</td><td class="col-restrict neg">−4,46%</td></tr>
          <tr><td>Sₗ crecimiento laboral 10 años</td><td class="col-high pos">+20,09%</td><td class="col-pre2025 pos">+10,45%</td><td class="col-current neg">−3,00%</td><td class="col-restrict neg">−10,93%</td></tr>
          <tr class="hl"><td>IEU (×10)</td><td class="col-high pos">+1,36</td><td class="col-pre2025 pos">+0,82</td><td class="col-current neu">+0,05</td><td class="col-restrict neg">−0,40</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <p class="footnote" style="border:none;padding:0;margin-bottom:18px">⁴ Census Vintage 2025, Greg David, "Immigration to NYC Plummeted as Trump Crackdown Took Hold," The CITY, 26 de marzo de 2026.</p>
  <div class="chart-row"><div class="cbox"><div class="cbox-label">Población proyectada 2023–2033</div><div class="cwrap"><canvas id="popChart"></canvas></div></div><div class="cbox"><div class="cbox-label">IEU por escenario</div><div class="cwrap"><canvas id="usiChart"></canvas></div></div></div>
  <div class="cbox"><div class="cbox-label">Fuerza laboral proyectada 2023–2033</div><div class="cwrap"><canvas id="lfChart"></canvas></div></div>
</div>`),
// EXPLORADOR
mkPage('explorer',false,`<div class="ph">
  <div class="ph-label">Explorador · Modelo en vivo</div>
  <h1>Construye tu propio escenario</h1>
  <p>Cambia los niveles de migración, el flujo doméstico, la construcción de vivienda y los pesos del IEU. El índice se recalcula al mover los controles deslizantes.</p>
</div>
<div class="pc">
  <div class="usi-big" style="margin-bottom:24px">
    <div class="usi-big-label">Índice de Estabilidad Urbana — Proyección 10 años</div>
    <div class="usi-big-num" id="liveUSI" style="color:var(--accent)">+0,82</div>
    <div class="usi-big-desc" id="liveDesc">Línea de base pre-2025. La ciudad crece aproximadamente un 10% en la década</div>
  </div>
  <div class="interp-row" style="margin-bottom:24px">
    <div class="icard"><span class="icard-label">Cambio poblacional (10 años)</span><div class="icard-val pos" id="ip-pop">+874.860</div><div class="icard-sub" id="ip-pop-sub">residentes ganados</div></div>
    <div class="icard"><span class="icard-label">Cambio fuerza laboral (10 años)</span><div class="icard-val pos" id="ip-lf">+424.756</div><div class="icard-sub" id="ip-lf-sub">trabajadores ganados</div></div>
    <div class="icard"><span class="icard-label">Presión habitacional (10 años)</span><div class="icard-val" id="ip-h">+4,3%</div><div class="icard-sub">cambio en personas/unidad</div></div>
  </div>
  <div class="ctrl-grid">
    <div class="ctrl-section">
      <h3>Variables de política</h3>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">Migración Internacional Neta / año</span><span class="ctrl-val" id="v-mi">144.098</span></div><input type="range" id="s-mi" min="0" max="250000" step="1000" value="144098"><div class="ctrl-marks"><span>0</span><span>125k</span><span>250k</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">Migración Doméstica Neta / año</span><span class="ctrl-val" id="v-dom">−91.239</span></div><input type="range" id="s-dom" min="-150000" max="0" step="1000" value="-91239"><div class="ctrl-marks"><span>−150k</span><span>−75k</span><span>0</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">Nuevas Unidades de Vivienda / año</span><span class="ctrl-val" id="v-units">22.000</span></div><input type="range" id="s-units" min="5000" max="60000" step="1000" value="20000"><div class="ctrl-marks"><span>5k</span><span>30k</span><span>60k</span></div></div>
    </div>
    <div class="ctrl-section">
      <h3>Pesos del IEU</h3>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">wₚ — Peso poblacional</span><span class="ctrl-val" id="v-wp">0,54</span></div><input type="range" id="s-wp" min="0.1" max="0.8" step="0.01" value="0.54"><div class="ctrl-marks"><span>0,1</span><span>0,45</span><span>0,8</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">wₗ — Peso laboral</span><span class="ctrl-val" id="v-wl">0,30</span></div><input type="range" id="s-wl" min="0.1" max="0.7" step="0.01" value="0.30"><div class="ctrl-marks"><span>0,1</span><span>0,4</span><span>0,7</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">wₕ — Penalización vivienda</span><span class="ctrl-val" id="v-wh">0,17</span></div><input type="range" id="s-wh" min="0.05" max="0.5" step="0.01" value="0.17"><div class="ctrl-marks"><span>0,05</span><span>0,28</span><span>0,5</span></div></div>
    </div>
  </div>
</div>`),
// MAPA + PROYECCIONES
mkPage('map',false,`<div class="ph">
  <div class="ph-label">Mapa y proyecciones</div>
  <h1>Distribución geográfica</h1>
  <p>IEU estimado para cada distrito comunitario según su proporción de nacidos en el extranjero y densidad habitacional. Las proyecciones por escenario se muestran junto al mapa.</p>
</div>
<div class="pc" style="padding-top:24px">
  <div class="map-layout" style="margin-bottom:24px">
    <div class="map-left">
      <div id="map"></div>
      <div class="map-legend">
        <div class="ml-title">Escala IEU</div>
        <div class="ml-item"><div class="ml-color" style="background:#2d8653"></div><span>≥ +0,8</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#9acd32"></div><span>+0,4–0,8</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#e67e22"></div><span>0–+0,4</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#e74c3c"></div><span>−0,4–0</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#8b0000"></div><span>≤ −0,4</span></div>
      </div>
    </div>
    <div class="map-right">
      <div class="mrp-section">
        <div class="mrp-title">IEU por borough</div>
        <div id="boroMini"></div>
      </div>
      <div class="mrp-section">
        <div class="mrp-title">Escenario actual</div>
        <div id="mapScenInfo" style="font-size:12px;color:var(--text2)">
          <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span style="color:var(--text3)">Migración intl. neta/año</span><span style="font-family:'DM Mono',monospace;font-size:11px;color:var(--accent)">144.098</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span style="color:var(--text3)">Umbral de equilibrio</span><span style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2)">56.612</span></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text3)">Margen</span><span style="font-family:'DM Mono',monospace;font-size:11px" class="pos">+87.486</span></div>
        </div>
        <div class="meter-wrap" style="margin-top:12px">
          <div class="meter-track"><div class="meter-fill" id="mapMFill" style="width:0%"></div><div class="meter-thresh" style="left:22.6%"><span>56.612</span></div></div>
          <div class="meter-labels"><span>0</span><span>250k</span></div>
        </div>
      </div>
    </div>
  </div>
  <h2 style="margin-bottom:16px">Proyecciones por escenario</h2>
  <div class="g4" id="mapCompGrid" style="margin-bottom:20px"></div>
  <div class="chart-row">
    <div class="cbox"><div class="cbox-label">Población 2023–2033 por escenario</div><div class="cwrap"><canvas id="mapPopChart"></canvas></div></div>
    <div class="cbox"><div class="cbox-label">Fuerza laboral 2023–2033 por escenario</div><div class="cwrap"><canvas id="mapLFChart"></canvas></div></div>
  </div>
  <p class="footnote">El mapa utiliza los límites reales de los distritos comunitarios de NYC. Los valores del IEU se calculan distribuyendo la migración proporcional a la población y proporción de nacidos en el extranjero de cada distrito. Fuentes: ACS 2023; Census Bureau Vintage 2024/2025.</p>
</div>`),
// HISTORIA
mkPage('history',false,`<div class="ph">
  <div class="ph-label">Validación histórica · 1990–2000</div>
  <h1>La misma dinámica,<br>treinta años antes</h1>
  <p>El modelo puede verificarse con una década en la que todas las cifras subyacentes se conocen con exactitud. La población de NYC creció de 7.322.564 a 8.008.278 entre 1990 y 2000.</p>
</div>
<div class="pc">
  <div class="g2">
    <div>
      <div class="eqbox"><div class="eqlabel">Resolviendo la migración neta, 1990–2000</div>$$S_p(1990,2000) = \\frac{8{,}008{,}278}{7{,}322{,}564} \\approx 1{,}094 \\quad (+9{,}4\\%)$$$$8{,}008{,}278 = 7{,}322{,}564 + 1{,}185{,}987 - 685{,}282 + M \\implies M = 185{,}009$$</div>
      <div class="callout" style="margin-top:16px"><p>La población nacida en el extranjero creció 788.101 esa década, una cifra mayor que el crecimiento neto total de población de 685.714. Las llegadas internacionales compensaron con creces la emigración doméstica.</p></div>
    </div>
    <div>
      <div class="card">
        <h3>1990–2000 vs. 2023–2024</h3>
        <table class="dt"><thead><tr><th>Métrica</th><th>1990–2000</th><th>2023–24</th></tr></thead><tbody><tr><td>Crecimiento poblacional</td><td class="pos">+685.714</td><td class="pos">+87.184</td></tr><tr><td>Aumento nacidos en extranjero</td><td class="pos">+788.101</td><td class="pos">+~144.098</td></tr><tr><td>¿Extranjeros &gt; crecimiento total?</td><td class="pos">Sí</td><td class="pos">Sí</td></tr><tr><td>Patrón</td><td colspan="2" style="color:var(--text2);font-size:11px">La inmigración absorbe la emigración doméstica</td></tr></tbody></table>
      </div>
      <div class="card" style="margin-top:12px">
        <h3>Lo que esto nos dice</h3>
        <p style="font-size:13px;margin-bottom:0">La misma estructura que define la demografía de NYC hoy ya estaba presente hace treinta años. Los residentes domésticos llevan décadas marchándose en grandes números, y la inmigración internacional ha sido consistentemente lo que evita que la población caiga. La situación actual no es nueva.</p>
      </div>
    </div>
  </div>
</div>`),
// ACERCA DE
mkPage('about',false,`<div class="ph">
  <div class="ph-label">Acerca de</div>
  <h1>Acerca de este trabajo</h1>
  <p>Tesis de honor, Universidad de Fordham, Primavera de 2026. Disciplinas: matemáticas, ciencias computacionales y español.</p>
</div>
<div class="pc">
  <div class="g2">
    <div class="card"><h3 style="margin-bottom:14px">Información de la tesis</h3><table class="dt"><tbody><tr><td>Título completo</td><td style="font-style:italic;font-size:11px">Motores de estabilidad: Inmigración y transformación demográfica en la ciudad de Nueva York</td></tr><tr><td>Autor</td><td>Jack Forester</td></tr><tr><td>Asesora</td><td>Dr. Carey Kasten</td></tr><tr><td>Institución</td><td>Universidad de Fordham</td></tr><tr><td>Año</td><td>Primavera de 2026</td></tr><tr><td>Disciplinas</td><td>Matemáticas · Ciencias computacionales · Español</td></tr></tbody></table></div>
    <div class="card"><h3 style="margin-bottom:14px">Fuentes de datos primarias</h3><table class="dt"><tbody><tr><td>Línea de base poblacional</td><td>Census Bureau Vintage 2024 y 2025</td></tr><tr><td>Datos de componentes</td><td style="font-size:11px">NYC DCP, mayo 2025, Apéndice A, Tabla 2</td></tr><tr><td>Participación laboral</td><td style="font-size:11px">Contralor del Estado de NY, marzo 2024</td></tr><tr><td>Contribución fiscal</td><td style="font-size:11px">American Immigration Council / ITEP 2023</td></tr><tr><td>Demanda de vivienda</td><td style="font-size:11px">Harvard JCHS, 2024</td></tr><tr><td>Oferta de vivienda</td><td style="font-size:11px">NYC Building Congress, 2025–27</td></tr><tr><td>Dato de política actual</td><td style="font-size:11px">The CITY, 26 de marzo de 2026</td></tr></tbody></table></div>
  </div>
  <div class="callout" style="margin-top:16px"><p>Todos los cálculos y proyecciones del IEU son del propio autor. Este sitio es un complemento de la tesis escrita. El objetivo era hacer el modelo interactivo para que los números pudieran explorarse directamente en lugar de solo leerse.</p></div>
</div>`)
];}