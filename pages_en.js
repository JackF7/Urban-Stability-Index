// English page builder
// Depends on model.js being loaded first

function mkPage(id,active,html){return`<div class="page${active?' active':''}" id="pg-${id}">${html}</div>`;}
function scLabel(k){return lang==='es'?SC[k].labelES:SC[k].label;}
function pill(k,active){return`<button class="pill${active?' active':''}" data-sc="${k}" onclick="loadSc('${k}')">${scLabel(k)} - ${(SC[k].mi/1000).toFixed(0)}k/${lang==='es'?'año':'yr'}</button>`;}

function buildPagesEN(){return[
mkPage('home',true,`<div class="ph" style="min-height:38vh;display:flex;flex-direction:column;justify-content:flex-end">
  <div class="ph-label">Fordham University · Spring 2026</div>
  <h1>Urban Stability<br>Index</h1>
  <p>A mathematical model of immigration's role in New York City's demographic future. Built as an honors thesis in mathematics, computer science, and Spanish.</p>
</div>
<div class="pc">
  <div class="stat-row">
    <div class="stat-cell"><div class="sv">3.1M</div><div class="sl">Foreign-born residents in NYC</div><div class="ss">ACS 2023 · 36.8% of population</div></div>
    <div class="stat-cell"><div class="sv">44.3%</div><div class="sl">of NYC's labor force is foreign-born</div><div class="ss">2.38x the national average</div></div>
    <div class="stat-cell"><div class="sv">$103B</div><div class="sl">Taxes paid by immigrants each year</div><div class="ss">NYC metro area · American Immigration Council 2023</div></div>
    <div class="stat-cell"><div class="sv" id="home-usi" style="color:var(--orange)">+0.05</div><div class="sl">Current USI, near the zero threshold</div><div class="ss">Based on 2025 enforcement levels</div></div>
  </div>
  <div class="g2" style="margin-bottom:24px">
    <div>
      <h2>What this project argues</h2>
      <p>New York City’s growth has long depended on forces beyond its natural population change. For years, the number of people leaving for other states has outpaced the net gain from births over deaths, leaving international immigration to play a central role in sustaining the city’s population.</p>
      <p>This thesis explores that relationship using Census Bureau data, examining how different federal immigration policy scenarios could shape the city’s future population, labor force, and housing landscape.</p>
      <button onclick="goPage('argument')" style="margin-top:6px;padding:9px 18px;background:var(--accent);color:var(--bg);border:none;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Crimson Pro',serif">Read the argument</button>
    </div>
    <div>
      <div class="callout">
        <p>Under current enforcement, net international migration has dropped to about <strong>66,000/yr</strong>. The minimum needed to prevent population loss is <strong>56,612</strong>. The USI is currently near <strong>zero</strong>.</p>
      </div>
      <div class="meter-wrap">
        <div class="meter-track" style="overflow:visible">
          <div id="hMFill_below" style="position:absolute;left:0;top:0;height:100%;width:0%;background:var(--red);border-radius:4px 0 0 4px;transition:width 1.2s cubic-bezier(.16,1,.3,1);"></div>
          <div id="hMFill_above" style="position:absolute;top:0;height:100%;width:0%;background:var(--green);border-radius:0 4px 4px 0;transition:width 1.2s cubic-bezier(.16,1,.3,1),left 1.2s cubic-bezier(.16,1,.3,1);display:none;"></div>
          <div id="hMFill_dot" style="position:absolute;top:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:var(--text);border:2px solid var(--bg);z-index:20;transition:left 1.2s cubic-bezier(.16,1,.3,1);left:0%;"></div>
          <div style="position:absolute;top:-5px;bottom:-5px;left:22.6%;width:2px;background:var(--text);opacity:.5;z-index:10;"></div>
          <span style="position:absolute;top:-20px;left:22.6%;transform:translateX(-50%);font-size:9px;font-family:'DM Mono',monospace;color:var(--text2);white-space:nowrap;">Min. needed: 56,612</span>
        </div>
        <div class="meter-labels" style="margin-top:10px"><span>0</span><span>250k</span></div>
      </div>
      <div class="meter-status" id="hMStatus" style="background:rgba(201,168,76,.08);color:var(--orange);border-left:3px solid var(--orange)">66,000 <span style="opacity:.6">(2025)</span> arrivals/yr</div>
      </div>
    </div>
  </div>
  <div class="g3">
    <button onclick="goPage('model')" class="card" style="cursor:pointer;text-align:left"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:8px;font-weight:600">The Model</div><div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:5px">USI Formula</div><div style="font-size:12px;color:var(--text3)">How population, labor, and housing combine into one number</div></button>
    <button onclick="goPage('scenarios')" class="card" style="cursor:pointer;text-align:left"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:8px;font-weight:600">Scenarios</div><div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:5px">Four Policy Paths</div><div style="font-size:12px;color:var(--text3)">Projections from high immigration to sustained restriction</div></button>
    <button onclick="goPage('map')" class="card" style="cursor:pointer;text-align:left"><div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--accent);margin-bottom:8px;font-weight:600">Map + Data</div><div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:5px">Interactive Map</div><div style="font-size:12px;color:var(--text3)">USI by community district, with scenario projections</div></button>
  </div>
</div>`),
mkPage('argument',false,`<div class="ph">
  <div class="ph-label">The Argument</div>
  <h1>Why immigration is the<br>deciding variable</h1>
  <p>New York City records more births than deaths every year. The population problem is something else entirely.</p>
</div>
<div class="pc">
  <div class="g2" style="margin-bottom:32px">
    <div>
      <h2>What the data shows</h2>
      <p>NYC's natural increase is positive: roughly 89,851 births against 55,224 deaths in 2023-24, a gain of 34,627. The problem is that 91,239 residents moved to other states that same year, wiping out that gain and then some.</p>
      <p>International immigration added 144,098 people, which covered the domestic outflow and produced a net population increase of 87,184. Without it, the city would have lost 56,612 residents despite having more births than deaths.</p>
      <div class="callout"><p>The math: domestic losses minus natural increase leaves a gap of 56,612 people per year that only international arrivals can fill.</p></div>
    </div>
    <div class="card" style="overflow-x:auto">
      <h3 style="margin-bottom:14px">NYC Population Components, 2023-2024</h3>
      <table class="dt">
        <thead><tr><th>Component</th><th>Value</th></tr></thead>
        <tbody>
          <tr><td>Annual births</td><td>89,851</td></tr>
          <tr><td>Annual deaths</td><td>55,224</td></tr>
          <tr><td>Natural increase</td><td class="pos">+34,627</td></tr>
          <tr><td>Net domestic migration</td><td class="neg">-91,239</td></tr>
          <tr><td>Net international migration</td><td class="pos">+144,098</td></tr>
          <tr><td>Total population change</td><td class="pos">+87,184</td></tr>
          <tr><td>Population July 2023</td><td>8,204,035</td></tr>
          <tr><td>Current policy migration (2025)</td><td class="neu">66,000</td></tr>
        </tbody>
      </table>
      <div class="footnote">NYC DCP, Population Estimates and Trends, May 2025, App. A, Table 2</div>
    </div>
  </div>
  <h2>The break-even threshold</h2>
  <p>The minimum number of net international arrivals needed to prevent population loss is 56,612 per year. That figure comes from subtracting natural increase (34,627) from the domestic outflow (91,239). Under the current enforcement trajectory, net arrivals have fallen to about 66,000, only 9,388 above that line.</p>
  <div class="meter-wrap">
        <div class="meter-track" style="overflow:visible">
          <div id="mFill_below" style="position:absolute;left:0;top:0;height:100%;width:0%;background:var(--red);border-radius:4px 0 0 4px;transition:width 1.2s cubic-bezier(.16,1,.3,1);"></div>
          <div id="mFill_above" style="position:absolute;top:0;height:100%;width:0%;background:var(--green);border-radius:0 4px 4px 0;transition:width 1.2s cubic-bezier(.16,1,.3,1),left 1.2s cubic-bezier(.16,1,.3,1);display:none;"></div>
          <div id="mFill_dot" style="position:absolute;top:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:var(--text);border:2px solid var(--bg);z-index:20;transition:left 1.2s cubic-bezier(.16,1,.3,1);left:0%;"></div>
          <div style="position:absolute;top:-5px;bottom:-5px;left:22.6%;width:2px;background:var(--text);opacity:.5;z-index:10;"></div>
          <span style="position:absolute;top:-20px;left:22.6%;transform:translateX(-50%);font-size:9px;font-family:'DM Mono',monospace;color:var(--text2);white-space:nowrap;">Min. needed: 56,612</span>
        </div>
        <div class="meter-labels" style="margin-top:10px"><span>0 arrivals/yr</span><span>250,000/yr</span></div>
      </div>
      <div class="meter-status" id="mStatus" style="background:rgba(201,168,76,.08);color:var(--orange);border-left:3px solid var(--orange)">Current: 66,000 <span style="opacity:.6">(2025)</span> arrivals/yr</div>
  </div>
  <div class="footnote">Greg David, "Immigration to NYC Plummeted as Trump Crackdown Took Hold," The CITY, March 26, 2026, citing U.S. Census Bureau Vintage 2025.</div>
</div>`),
mkPage('model',false,`<div class="ph">
  <div class="ph-label">The Model</div>
  <h1>How the USI is calculated</h1>
  <p>Three equations cover population, labor force, and housing pressure. Each produces a growth rate, and the three are combined into a single weighted index. A score of zero means the city is holding steady.</p>
</div>
<div class="pc">
  <div class="g2" style="margin-bottom:16px">
    <div class="card">
      <h3>I. Population Model</h3>
      <div class="eqbox"><div class="eqlabel">Differential Equation</div>$$\\frac{dP}{dt} = B(t) - D + M \\qquad B(t) = b_i P_i + b_n P_n$$$$S_p = \\frac{P(t_f) - P(t_0)}{P(t_0)} \\times 10$$</div>
      <table class="dt"><thead><tr><th>Variable</th><th>Definition</th><th>Value</th></tr></thead><tbody><tr><td>P(t₀)</td><td>Population July 2023</td><td>8,204,035</td></tr><tr><td>bₙ / bᵢ</td><td>Birth rates, native and foreign-born</td><td>1.24% / 1.39%</td></tr><tr><td>Mᵢ / Mᵈ</td><td>International and domestic migration</td><td class="pos">+144,098 / <span class="neg">-91,239</span></td></tr></tbody></table>
    </div>
    <div class="card">
      <h3>II. Labor Force Model</h3>
      <div class="eqbox"><div class="eqlabel">Labor Composition</div>$$L(t) = E_i \\cdot W_i + E_n \\cdot W_n$$$$S_l = \\frac{L(t_f) - L(t_0)}{L(t_0)} \\times 10$$<div class="eqnote">Arriving immigrants enter at 70% labor force participation; departing domestic migrants exit at 64%</div></div>
      <table class="dt"><thead><tr><th>Variable</th><th>Value</th></tr></thead><tbody><tr><td>Wᵢ (foreign-born workers)</td><td>1,800,000 (44.3%)</td></tr><tr><td>Wₙ (native-born workers)</td><td>2,263,000 (55.7%)</td></tr><tr><td>Eᵢ / Eₙ (participation rates)</td><td>68% / 63%</td></tr></tbody></table>
    </div>
  </div>
  <div class="card" style="margin-bottom:16px">
    <h3>III. Housing Pressure Model</h3>
    <div class="eqbox">$$H(t) = \\frac{P_i(t) + P_n(t)}{U(t)} \\qquad H(2023) \\approx 2.23$$$$S_H = \\frac{H(t_f) - H(2023)}{H(2023)} \\times 10$$<div class="eqnote">Housing stock grows at +22,000 units/yr. A rising H value means more people per unit, which counts as a cost in the final index.</div></div>
  </div>
  <h2 style="margin-bottom:12px">Where the weights come from</h2>
  <p style="margin-bottom:16px">Each weight reflects immigration's measured share of that dimension. The three raw figures (80.6, 44.3, 25.0) are normalized to sum to 1.0 by dividing each by their total of 149.9.</p>
  <div class="g3" style="margin-bottom:16px">
    <div class="wcard"><div class="wcard-num">0.53</div><div class="wcard-dim">wₚ — Population</div><div class="wcard-desc">In 2023-24, international immigration accounted for 80.6% of all positive population inputs: 144,098 out of (144,098 + 34,627). That share normalizes to 0.53.</div><div class="wcard-src">80.6 / 149.9 = 0.53 · Census Vintage 2024</div></div>
    <div class="wcard"><div class="wcard-num">0.30</div><div class="wcard-dim">wₗ — Labor</div><div class="wcard-desc">Foreign-born workers make up 44.3% of NYC's labor force, more than twice the 18.6% national figure. Immigrants are disproportionately working-age and have higher participation rates.</div><div class="wcard-src">44.3 / 149.9 = 0.30 · NYS Comptroller 2024</div></div>
    <div class="wcard"><div class="wcard-num">0.17</div><div class="wcard-dim">wₕ — Housing (penalty)</div><div class="wcard-desc">Immigrant households accounted for 25% of U.S. household formation between 2019 and 2023. Because increased density is a cost, this component is subtracted rather than added.</div><div class="wcard-src">25.0 / 149.9 = 0.17 · Harvard JCHS 2024</div></div>
  </div>
  <div class="card" style="text-align:center;border-color:rgba(232,197,71,.2)">
    <div class="eqbox" style="border:none;background:transparent;padding:6px 0 0;margin:0"><div class="eqlabel" style="text-align:center">The Urban Stability Index, scaled x10</div>$$\\text{USI} = \\underbrace{5.3}_{\\mathclap{w_p}} \\cdot S_p \\;+\\; \\underbrace{3.0}_{\\mathclap{w_l}} \\cdot S_l \\;-\\; \\underbrace{1.7}_{\\mathclap{w_h}} \\cdot S_H$$<div class="eqnote">Above zero means growth. Below zero means decline. Zero means the city is holding steady.</div></div>
  </div>
</div>`),
mkPage('scenarios',false,`<div class="ph">
  <div class="ph-label">Scenarios</div>
  <h1>Four immigration levels,<br>four outcomes</h1>
  <p>Domestic out-migration and natural increase are held constant across all four scenarios. Only net annual international migration changes.</p>
</div>
<div class="pc">
  <div class="pills" id="scenPills">${['high','pre2025','current','restrict'].map((k,i)=>pill(k,i===1)).join('')}</div>
  <div class="g4" id="compGrid" style="margin-bottom:20px"></div>
  <div style="margin-bottom:18px">
    <div class="tab-row">
      <button class="tb active" onclick="filterScen('all',this)">All</button>
      <button class="tb" onclick="filterScen('high',this)">High</button>
      <button class="tb" onclick="filterScen('pre2025',this)">Pre-2025</button>
      <button class="tb" onclick="filterScen('current',this)">Current</button>
      <button class="tb" onclick="filterScen('restrict',this)">Restricted</button>
    </div>
    <div class="card" style="border-radius:0 0 10px 10px;border-top:none;overflow-x:auto">
      <table class="dt" id="scenTable">
        <thead><tr><th>Metric</th><th class="col-high">High</th><th class="col-pre2025">Pre-2025</th><th class="col-current">Current ⁴</th><th class="col-restrict">Restricted</th></tr></thead>
        <tbody>
          <tr><td>Net intl. migration/yr</td><td class="col-high">200,000</td><td class="col-pre2025">144,098</td><td class="col-current">66,000</td><td class="col-restrict">20,000</td></tr>
          <tr><td>Net total migration/yr</td><td class="col-high pos">+108,761</td><td class="col-pre2025 pos">+52,859</td><td class="col-current neg">-25,239</td><td class="col-restrict neg">-71,239</td></tr>
          <tr><td>2034 population</td><td class="col-high">9,637,915</td><td class="col-pre2025">9,078,895</td><td class="col-current">8,297,915</td><td class="col-restrict">7,837,915</td></tr>
          <tr><td>2034 labor force</td><td class="col-high">4,879,070</td><td class="col-pre2025">4,487,756</td><td class="col-current">3,941,070</td><td class="col-restrict">3,619,070</td></tr>
          <tr><td>Sₚ 10-yr population growth</td><td class="col-high pos">+17.48%</td><td class="col-pre2025 pos">+10.66%</td><td class="col-current pos">+1.14%</td><td class="col-restrict neg">-4.46%</td></tr>
          <tr><td>Sₗ 10-yr labor force growth</td><td class="col-high pos">+20.09%</td><td class="col-pre2025 pos">+10.45%</td><td class="col-current neg">-3.00%</td><td class="col-restrict neg">-10.93%</td></tr>
          <tr class="hl"><td>USI (x10)</td><td class="col-high pos">+1.36</td><td class="col-pre2025 pos">+0.82</td><td class="col-current neu">+0.05</td><td class="col-restrict neg">-0.40</td></tr>
        </tbody>
      </table>
    </div>
  </div>
  <p class="footnote" style="border:none;padding:0;margin-bottom:18px">⁴ Census Vintage 2025, as reported in Greg David, "Immigration to NYC Plummeted as Trump Crackdown Took Hold," The CITY, March 26, 2026.</p>
  <div class="chart-row"><div class="cbox"><div class="cbox-label">Projected Population 2023-2033</div><div class="cwrap"><canvas id="popChart"></canvas></div></div><div class="cbox"><div class="cbox-label">USI by Scenario</div><div class="cwrap"><canvas id="usiChart"></canvas></div></div></div>
  <div class="cbox"><div class="cbox-label">Projected Labor Force 2023-2033</div><div class="cwrap"><canvas id="lfChart"></canvas></div></div>
</div>`),
mkPage('explorer',false,`<div class="ph">
  <div class="ph-label">Explorer · Live Model</div>
  <h1>Adjust the parameters</h1>
  <p>Change migration levels, domestic flow, housing construction, and the USI weights. The index recalculates as you move the sliders.</p>
</div>
<div class="pc">
  <div class="usi-big" style="margin-bottom:24px">
    <div class="usi-big-label">Urban Stability Index, 10-year projection</div>
    <div class="usi-big-num" id="liveUSI" style="color:var(--accent)">+0.82</div>
    <div class="usi-big-desc" id="liveDesc">Pre-2025 baseline. The city grows by roughly 10% over the decade.</div>
  </div>
  <div class="interp-row" style="margin-bottom:24px">
    <div class="icard"><span class="icard-label">Population Change (10-yr)</span><div class="icard-val pos" id="ip-pop">+874,860</div><div class="icard-sub" id="ip-pop-sub">residents gained</div></div>
    <div class="icard"><span class="icard-label">Labor Force Change (10-yr)</span><div class="icard-val pos" id="ip-lf">+424,756</div><div class="icard-sub" id="ip-lf-sub">workers gained</div></div>
    <div class="icard"><span class="icard-label">Housing Pressure (10-yr)</span><div class="icard-val" id="ip-h">+4.3%</div><div class="icard-sub">change in persons per unit</div></div>
  </div>
  <div class="ctrl-grid">
    <div class="ctrl-section">
      <h3>Policy Variables</h3>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">Net International Migration / yr</span><span class="ctrl-val" id="v-mi">144,098</span></div><input type="range" id="s-mi" min="0" max="250000" step="1000" value="144098"><div class="ctrl-marks"><span>0</span><span>125k</span><span>250k</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">Net Domestic Migration / yr</span><span class="ctrl-val" id="v-dom">-91,239</span></div><input type="range" id="s-dom" min="-150000" max="0" step="1000" value="-91239"><div class="ctrl-marks"><span>-150k</span><span>-75k</span><span>0</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">New Housing Units / yr</span><span class="ctrl-val" id="v-units">22,000</span></div><input type="range" id="s-units" min="5000" max="60000" step="1000" value="20000"><div class="ctrl-marks"><span>5k</span><span>30k</span><span>60k</span></div></div>
    </div>
    <div class="ctrl-section">
      <h3>USI Weights</h3>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">wₚ — Population weight</span><span class="ctrl-val" id="v-wp">0.54</span></div><input type="range" id="s-wp" min="0.1" max="0.8" step="0.01" value="0.53"><div class="ctrl-marks"><span>0.1</span><span>0.45</span><span>0.8</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">wₗ — Labor weight</span><span class="ctrl-val" id="v-wl">0.30</span></div><input type="range" id="s-wl" min="0.1" max="0.7" step="0.01" value="0.30"><div class="ctrl-marks"><span>0.1</span><span>0.4</span><span>0.7</span></div></div>
      <div class="ctrl"><div class="ctrl-row"><span class="ctrl-name">wₕ — Housing penalty</span><span class="ctrl-val" id="v-wh">0.17</span></div><input type="range" id="s-wh" min="0.05" max="0.5" step="0.01" value="0.17"><div class="ctrl-marks"><span>0.05</span><span>0.28</span><span>0.5</span></div></div>
    </div>
  </div>
</div>`),
mkPage('map',false,`<div class="ph">
  <div class="ph-label">Map & Projections</div>
  <h1>Geographic distribution</h1>
  <p>USI estimated for each community district based on its foreign-born share and housing density. Scenario projections are shown alongside.</p>
</div>
<div class="pc" style="padding-top:24px">
  <div class="map-layout" style="margin-bottom:24px">
    <div class="map-left">
      <div id="map"></div>
      <div class="map-legend">
        <div class="ml-title">USI Scale</div>
        <div class="ml-item"><div class="ml-color" style="background:#2d8653"></div><span>+0.8 and above</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#9acd32"></div><span>+0.4 to +0.8</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#e67e22"></div><span>0 to +0.4</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#e74c3c"></div><span>-0.4 to 0</span></div>
        <div class="ml-item"><div class="ml-color" style="background:#8b0000"></div><span>-0.4 and below</span></div>
      </div>
    </div>
    <div class="map-right">
      <div class="mrp-section">
        <div class="mrp-title">Borough USI</div>
        <div id="boroMini"></div>
      </div>
      <div class="mrp-section">
        <div class="mrp-title">Current Scenario</div>
        <div id="mapScenInfo" style="font-size:12px;color:var(--text2)">
          <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span style="color:var(--text3)">Net intl. migration/yr</span><span style="font-family:'DM Mono',monospace;font-size:11px;color:var(--accent)">144,098</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span style="color:var(--text3)">Break-even</span><span style="font-family:'DM Mono',monospace;font-size:11px;color:var(--text2)">56,612</span></div>
          <div style="display:flex;justify-content:space-between"><span style="color:var(--text3)">Margin</span><span style="font-family:'DM Mono',monospace;font-size:11px" class="pos">+87,486</span></div>
        </div>
        <div class="meter-wrap" style="margin-top:12px">
          <div class="meter-track" style="overflow:visible">
            <div id="mapMFill_below" style="position:absolute;left:0;top:0;height:100%;width:0%;background:var(--red);border-radius:4px 0 0 4px;transition:width .6s ease;"></div>
            <div id="mapMFill_above" style="position:absolute;top:0;height:100%;width:0%;background:var(--green);border-radius:0 4px 4px 0;transition:width .6s ease,left .6s ease;display:none;"></div>
            <div id="mapMFill_dot" style="position:absolute;top:50%;transform:translate(-50%,-50%);width:10px;height:10px;border-radius:50%;background:var(--text);border:2px solid var(--bg);z-index:20;transition:left .6s ease;left:0%;"></div>
            <div style="position:absolute;top:-4px;bottom:-4px;left:22.6%;width:2px;background:var(--text);opacity:.5;z-index:10;"></div>
            <span style="position:absolute;top:-18px;left:22.6%;transform:translateX(-50%);font-size:9px;font-family:'DM Mono',monospace;color:var(--text2);white-space:nowrap;">56,612</span>
          </div>
          <div class="meter-labels" style="margin-top:10px"><span>0</span><span>250k</span></div>
        </div>
        </div>
      </div>
    </div>
  </div>
  <h2 style="margin-bottom:16px">Scenario Projections</h2>
  <div class="g4" id="mapCompGrid" style="margin-bottom:20px"></div>
  <div class="chart-row">
    <div class="cbox"><div class="cbox-label">Population 2023-2033 by Scenario</div><div class="cwrap"><canvas id="mapPopChart"></canvas></div></div>
    <div class="cbox"><div class="cbox-label">Labor Force 2023-2033 by Scenario</div><div class="cwrap"><canvas id="mapLFChart"></canvas></div></div>
  </div>
  <p class="footnote">Community district boundaries from NYC Open Data. USI values are estimated by allocating city-level migration proportionally using each district's foreign-born share and total population. Sources: ACS 2023; Census Bureau Vintage 2024/2025.</p>
</div>`),
mkPage('history',false,`<div class="ph">
  <div class="ph-label">Historical Validation · 1990-2000</div>
  <h1>The 1990s show the same pattern</h1>
  <p>The model can be checked against a decade where all the underlying figures are known. NYC's population grew from 7,322,564 to 8,008,278 between 1990 and 2000.</p>
</div>
<div class="pc">
  <div class="g2">
    <div>
      <div class="eqbox"><div class="eqlabel">Solving for net migration, 1990-2000</div>$$S_p(1990,2000) = \\frac{8{,}008{,}278}{7{,}322{,}564} \\approx 1.094 \\quad (+9.4\\%)$$$$8{,}008{,}278 = 7{,}322{,}564 + 1{,}185{,}987 - 685{,}282 + M \\implies M = 185{,}009$$</div>
      <div class="callout" style="margin-top:16px"><p>The foreign-born population grew by 788,101 that decade, which is larger than the city's total net population growth of 685,714. International arrivals more than compensated for domestic outflow.</p></div>
    </div>
    <div>
      <div class="card">
        <h3>1990-2000 vs. 2023-2024</h3>
        <table class="dt"><thead><tr><th>Metric</th><th>1990-2000</th><th>2023-24</th></tr></thead><tbody><tr><td>Population growth</td><td class="pos">+685,714</td><td class="pos">+87,184</td></tr><tr><td>Foreign-born increase</td><td class="pos">+788,101</td><td class="pos">+~144,098</td></tr><tr><td>FB increase exceeds total growth</td><td class="pos">Yes</td><td class="pos">Yes</td></tr><tr><td>Structural pattern</td><td colspan="2" style="color:var(--text2);font-size:11px">International arrivals absorb domestic outflow</td></tr></tbody></table>
      </div>
      <div class="card" style="margin-top:12px">
        <h3>What this tells us</h3>
        <p style="font-size:13px;margin-bottom:0">The same structure that defines NYC's demography today was already present thirty years ago. Domestic residents have been leaving in large numbers for decades, and international immigration has consistently been what keeps the population from falling. The current situation is not new.</p>
      </div>
    </div>
  </div>
</div>`),
mkPage('about',false,`<div class="ph">
  <div class="ph-label">About</div>
  <h1>About this project</h1>
  <p>Honors senior thesis, Fordham University, Spring 2026. Disciplines: mathematics, computer science, and Spanish.</p>
</div>
<div class="pc">
  <div class="g2">
    <div class="card"><h3 style="margin-bottom:14px">Thesis Information</h3><table class="dt"><tbody><tr><td>Full title</td><td style="font-style:italic;font-size:11px">Urban Stability Index: Immigration and Demographic Transformation in New York City</td></tr><tr><td>Author</td><td>Jack Forester</td></tr><tr><td>Advisor</td><td>Dr. Carey Kasten</td></tr><tr><td>Institution</td><td>Fordham University</td></tr><tr><td>Year</td><td>Spring 2026</td></tr><tr><td>Disciplines</td><td>Mathematics · Computer Science · Spanish</td></tr></tbody></table></div>
    <div class="card"><h3 style="margin-bottom:14px">Data Sources</h3><table class="dt"><tbody><tr><td>Population baseline</td><td>Census Bureau Vintage 2024 and 2025</td></tr><tr><td>Component data</td><td style="font-size:11px">NYC DCP, May 2025, App. A, Table 2</td></tr><tr><td>Labor force share</td><td style="font-size:11px">NYS Comptroller, March 2024</td></tr><tr><td>Tax figures</td><td style="font-size:11px">American Immigration Council / ITEP 2023</td></tr><tr><td>Housing demand</td><td style="font-size:11px">Harvard JCHS, 2024</td></tr><tr><td>Housing supply</td><td style="font-size:11px">NYC Building Congress, 2025-27</td></tr><tr><td>Current policy figure</td><td style="font-size:11px">The CITY, March 26, 2026</td></tr></tbody></table></div>
  </div>
  <div class="callout" style="margin-top:16px"><p>All USI calculations and projections are the author's own. This site is a companion to the written thesis. The goal was to make the model interactive so the numbers could be explored directly rather than just read about.</p></div>
</div>`)
];}
