import { useEffect, useMemo, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { Hero } from './components/Hero'
import { CreativeModes } from './components/CreativeModes'
import { ProjectPanel } from './components/ProjectPanel'
import { InspirationGallery } from './components/InspirationGallery'
import { StyleSelectors } from './components/StyleSelectors'
import { FeaturePage } from './components/FeaturePage'
import { PromptStudio } from './components/prompt/PromptStudio'
import { Footer } from './components/Footer'
import { useLocalProject } from './hooks/useLocalProject'
import { useWorkspace } from './hooks/useWorkspace'
import { SavedWorkspace } from './components/workspace/SavedWorkspace'
import { ProductionCenter } from './components/production/ProductionCenter'
import { onboardingStorageKey, QuickGuide } from './components/QuickGuide'
import { moods } from './data/appData'
import type { BuiltPrompt, NavId, SavedPromptRecord } from './types'

export function App() {
  const [activePage, setActivePage] = useState<NavId>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimer = useRef<number | null>(null)
  const { project, currentPrompt, setCurrentPrompt, updateProject, saveProject, savedAt } = useLocalProject()
  const workspace = useWorkspace()
  const [remixSource, setRemixSource] = useState<SavedPromptRecord | null>(null)
  const [productionPrompt, setProductionPrompt] = useState<BuiltPrompt | null>(null)
  const [productionReturnPage, setProductionReturnPage] = useState<NavId>('home')
  const [guideFirstVisit, setGuideFirstVisit] = useState(() => { try { return localStorage.getItem(onboardingStorageKey) !== 'true' } catch { return true } })
  const [guideOpen, setGuideOpen] = useState(guideFirstVisit)

  const prompt = useMemo(() => currentPrompt?.prompt || '', [currentPrompt])

  useEffect(() => {
    if (!currentPrompt && workspace.prompts.length) {
      const latest = [...workspace.prompts].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))[0]
      setCurrentPrompt(latest)
    }
  }, [currentPrompt, setCurrentPrompt, workspace.prompts])

  const showToast = (message: string) => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast(message)
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }
  const navigate = (page: NavId) => { if (page !== 'remix') setRemixSource(null); if (page === 'sizing' && activePage !== 'sizing') setProductionReturnPage(activePage); if (page !== 'sizing') setProductionPrompt(null); setActivePage(page); setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const remixSaved = (saved: SavedPromptRecord) => { setCurrentPrompt(saved); setRemixSource(saved); setActivePage('remix'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const openProduction = (source: BuiltPrompt) => { setCurrentPrompt(source); setProductionReturnPage(activePage); setProductionPrompt(source); setActivePage('sizing'); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const closeGuide = () => { try { localStorage.setItem(onboardingStorageKey, 'true') } catch { /* The guide can still close when storage is unavailable. */ } setGuideOpen(false); setGuideFirstVisit(false) }
  const openGuide = () => { setGuideFirstVisit(false); setGuideOpen(true) }
  const copyPrompt = async () => {
    if (!currentPrompt) { showToast('Build or open a design first.'); return }
    try { await navigator.clipboard.writeText(prompt); showToast('Prompt copied to your clipboard.') }
    catch { showToast('Copy was blocked by your browser. Use Export Prompt instead.') }
  }
  const exportPrompt = () => {
    if (!currentPrompt) { showToast('Build or open a design first.'); return }
    try { const blob = new Blob([prompt], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = `${currentPrompt.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'gloss-audacity'}-prompt.txt`; link.click(); URL.revokeObjectURL(url); showToast('Prompt exported.') }
    catch { showToast('Export failed. Copy the prompt instead, or check browser download permissions.') }
  }
  const surprise = () => {
    const currentIndex = moods.indexOf(project.selectedMood)
    updateProject({ selectedMood: moods[(currentIndex + 1) % moods.length], selectedEffect: project.selectedEffect === 'Gold Glitter' ? 'Gold Foil' : 'Gold Glitter' })
    showToast('A fresh style combination is ready.')
  }
  const creationModes: NavId[] = ['build', 'shake', 'idea', 'remix', 'collection']

  return (
    <div className="app-shell">
      <Sidebar active={activePage} open={menuOpen} project={project} savedCount={workspace.prompts.length} onNavigate={navigate} onClose={() => setMenuOpen(!menuOpen)} onModeChange={(mode) => updateProject({ mode })} onSizeChange={(size) => updateProject({ size })} />
      <div className="app-column">
        <Header onSurprise={surprise} onFavorites={() => navigate('saved')} onHelp={openGuide} />
        {activePage === 'home' ? (
          <main className="dashboard">
            <div className="dashboard-main">
              <Hero onStart={() => navigate('build')} onGuide={openGuide} />
              <CreativeModes onSelect={navigate} />
              <StyleSelectors project={project} onUpdate={updateProject} />
            </div>
            <aside className="dashboard-rail">
              <ProjectPanel project={project} hasPrompt={Boolean(currentPrompt)} savedAt={savedAt} onSave={() => showToast(saveProject() ? 'Project saved locally.' : 'Project could not be saved. Check browser storage permissions or available space.')} onCopy={copyPrompt} onExport={exportPrompt} />
              <InspirationGallery onViewAll={() => navigate('gallery')} />
            </aside>
          </main>
        ) : activePage === 'saved' ? (
          <SavedWorkspace prompts={workspace.prompts} collections={workspace.collections} onBack={() => navigate('home')} notify={showToast} onActivate={setCurrentPrompt} onRemix={remixSaved} onProduction={openProduction} updatePrompt={workspace.updatePrompt} removePrompt={workspace.removePrompt} duplicatePrompt={workspace.duplicatePrompt} updateCollection={workspace.updateCollection} removeCollection={workspace.removeCollection} duplicateCollection={workspace.duplicateCollection} addToCollection={workspace.addToCollection} removeFromCollection={workspace.removeFromCollection} backup={workspace.backup} mergeBackup={workspace.mergeBackup} />
        ) : creationModes.includes(activePage) ? (
          <PromptStudio key={`${activePage}-${remixSource?.id || 'new'}`} mode={activePage as 'build' | 'shake' | 'idea' | 'remix' | 'collection'} production={project.mode} onBack={() => navigate('home')} onModeChange={(mode) => updateProject({ mode })} notify={showToast} initialRemixPrompt={remixSource?.prompt} onSavePrompt={workspace.saveBuiltPrompt} onSaveCollection={workspace.saveCollection} onOpenProduction={openProduction} onCurrentPrompt={setCurrentPrompt} />
        ) : activePage === 'sizing' ? (
          <ProductionCenter prompt={productionPrompt} savedPrompts={workspace.prompts} onBack={() => navigate(productionReturnPage)} notify={showToast} onSaveAsNew={(next, mode) => { workspace.saveBuiltPrompt(next, mode, true) }} />
        ) : <FeaturePage page={activePage} onBack={() => navigate('home')} />}
        <Footer />
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
      {workspace.storageError && <div className="storage-alert" role="alert"><span>{workspace.storageError}</span><button onClick={workspace.clearStorageError}>Dismiss</button></div>}
      <QuickGuide open={guideOpen} firstVisit={guideFirstVisit} onClose={closeGuide} onStart={() => { closeGuide(); navigate('build') }} />
    </div>
  )
}
