const { expect, describe, it } = require('@jest/globals');
const request = require('./config');

require('jest-extended');

describe('interaction with rpc', () => {
  it('number of masterNodes', (done) => {
    request
      .get('/statsInfo/count/')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.body).toBeObject();
        expect(res.body.nMasterNodes.total).toBeNumber();
        expect(res.body.nMasterNodes.enabled).toBeNumber();
        expect(res.statusCode).toBe(200);
        done();
      });
  }, 30000);

  it('list of active proposals', (done) => {
    request
      .get('/statsInfo/list')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeArray();
        done();
      });
  }, 30000);
  //
  it('object containing various state info regarding blockchain processing', (done) => {
    request
      .get('/statsInfo/getinfo')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.BlockChainInfo.chain).toBeString();
        expect(res.body.BlockChainInfo.blocks).toBeNumber();
        expect(res.body.BlockChainInfo.headers).toBeNumber();
        expect(res.body.BlockChainInfo.bestblockhash.length).toBe(64);
        expect(res.body.BlockChainInfo.difficulty).toBeNumber();
        expect(res.body.BlockChainInfo.mediantime).toBeNumber();
        expect(res.body.BlockChainInfo.verificationprogress).toBeWithin(0, 1);
        expect(res.body.BlockChainInfo.initialblockdownload).toBeBoolean();
        expect(res.body.BlockChainInfo.chainwork).toBeString();
        expect(res.body.BlockChainInfo.size_on_disk).toBeNumber();
        expect(res.body.BlockChainInfo.pruned).toBeBoolean();
        // expect(res.body.BlockChainInfo.pruneheight).toBeNumber();
        // expect(res.body.BlockChainInfo.automatic_pruning).toBeBoolean();
        expect(res.body.BlockChainInfo.geth_sync_status).toBeString();
        expect(res.body.BlockChainInfo.geth_total_blocks).toBeNumber();
        expect(res.body.BlockChainInfo.geth_current_block).toBeNumber();
        expect(res.body.BlockChainInfo.softforks).toBeObject();
        expect(res.body.BlockChainInfo.warnings).toBeString();
        done();
      });
  }, 30000);

  it('object containing mining-related information', (done) => {
    request
      .get('/statsInfo/getmininginfo')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeObject();
        expect(res.body.blocks).toBeNumber();
        expect(res.body.difficulty).toBeNumber();
        expect(res.body.networkhashps).toBeNumber();
        expect(res.body.pooledtx).toBeNumber();
        expect(res.body.chain).toBeString();
        expect(res.body.warnings).toBeString();
        done();
      });
  }, 30000);

  it('object containing governance parameters', (done) => {
    request
      .get('/statsInfo/getgovernanceinfo')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeObject();
        expect(res.body.governanceminquorum).toBeNumber();
        expect(res.body.masternodewatchdogmaxseconds).toBeNumber();
        expect(res.body.sentinelpingmaxseconds).toBeNumber();
        expect(res.body.proposalfee).toBeNumber();
        expect(res.body.superblockcycle).toBeNumber();
        expect(res.body.lastsuperblock).toBeNumber();
        expect(res.body.nextsuperblock).toBeNumber();
        expect(res.body.maxgovobjdatasize).toBeNumber();
        done();
      });
  }, 30000);

  it('absolute maximum sum of superblock payments allowed', (done) => {
    request
      .get('/statsInfo/getsuperblockbudget')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.lbs).toBeObject();
        expect(res.body.lbs.block).toBeNumber();
        expect(res.body.lbs.budget).toBeNumber();
        expect(res.body.nbs).toBeObject();
        expect(res.body.nbs.block).toBeNumber();
        expect(res.body.nbs.budget).toBeNumber();
        done();
      });
  }, 30000);

  it('information for statistics including map information', async (done) => {
    request
      .get('/statsInfo/mnStats')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeObject();
        expect(res.body.stats).toBeObject();
        expect(res.body.stats.mn_stats.total).toBeString();
        expect(res.body.stats.mn_stats.enabled).toBeString();
        expect(res.body.stats.mn_stats.new_start_required).toBeString();
        expect(res.body.stats.mn_stats.sentinel_ping_expired).toBeString();
        expect(res.body.stats.mn_stats.total_locked).toBeString();
        expect(res.body.stats.mn_stats.coins_percent_locked).toBeString();
        expect(res.body.stats.mn_stats.current_supply).toBeString();
        expect(res.body.stats.mn_stats.collateral_req).toBeString();
        expect(res.body.stats.mn_stats.masternode_price_usd).toBeString();
        expect(res.body.stats.mn_stats.masternode_price_btc).toBeString();
        expect(res.body.stats.mn_stats.roi).toBeString();
        expect(res.body.stats.mn_stats.payout_frequency).toBeString();
        expect(res.body.stats.mn_stats.first_pay).toBeString();
        expect(res.body.stats.mn_stats.reward_eligble).toBeString();
        expect(res.body.stats.price_stats.price_usd).toBeString();
        expect(res.body.stats.price_stats.price_btc).toBeString();
        expect(res.body.stats.price_stats.circulating_supply).toBeString();
        expect(res.body.stats.price_stats.total_supply).toBeString();
        expect(res.body.stats.price_stats.volume_usd).toBeString();
        expect(res.body.stats.price_stats.volume_btc).toBeString();
        expect(res.body.stats.price_stats.price_change).toBeString();
        expect(res.body.stats.price_stats.market_cap_usd).toBeString();
        expect(res.body.stats.price_stats.market_cap_btc).toBeString();
        expect(res.body.stats.blockchain_stats.version).toBeNumber();
        expect(res.body.stats.blockchain_stats.sub_version).toBeString();
        expect(res.body.stats.blockchain_stats.protocol).toBeNumber();
        expect(res.body.stats.blockchain_stats.connections).toBeNumber();
        expect(res.body.stats.blockchain_stats.genesis).toBeString();
        expect(res.body.stats.blockchain_stats.avg_block).toBeString();
        expect(res.body.stats.superblock_stats.last_superblock).toBeNumber();
        expect(res.body.stats.superblock_stats.next_superblock).toBeString();
        expect(res.body.stats.superblock_stats.proposal_fee).toBeNumber();
        expect(res.body.stats.superblock_stats.budget).toBeNumber();
        expect(res.body.stats.superblock_stats.superblock_date).toBeString();
        expect(res.body.stats.superblock_stats.voting_deadline).toBeString();
        expect(res.body.stats.superblock_stats.sb1).toBeString();
        expect(res.body.stats.superblock_stats.sb2).toBeString();
        expect(res.body.stats.superblock_stats.sb3).toBeString();
        expect(res.body.stats.superblock_stats.sb4).toBeString();
        expect(res.body.stats.superblock_stats.sb5).toBeString();
        expect(res.body.stats.superblock_stats.sb1Budget).toBeNumber();
        expect(res.body.stats.superblock_stats.sb2Budget).toBeNumber();
        expect(res.body.stats.superblock_stats.sb3Budget).toBeNumber();
        expect(res.body.stats.superblock_stats.sb4Budget).toBeNumber();
        expect(res.body.stats.superblock_stats.sb5Budget).toBeNumber();
        expect(res.body.stats.superblock_stats.sb1Date).toBeString();
        expect(res.body.stats.superblock_stats.sb2Date).toBeString();
        expect(res.body.stats.superblock_stats.sb3Date).toBeString();
        expect(res.body.stats.superblock_stats.sb4Date).toBeString();
        expect(res.body.stats.superblock_stats.sb5Date).toBeString();
        expect(res.body.stats.income_stats).toBeObject();
        expect(res.body.stats.income_stats_seniority_one_year).toBeObject();
        expect(res.body.stats.income_stats_seniority_two_year).toBeObject();
        expect(res.body.mapData).toBeObject();
        expect(res.body.mapData.DEU).toBeObject();
        expect(res.body.mapData.FIN).toBeObject();
        expect(res.body.mapData.USA).toBeObject();
        expect(res.body.mapFills).toBeObject();
        done();
      });
  }, 30000);

  it('number of app users', async (done) => {
    request
      .get('/statsInfo/users')
      .set('Content-type', 'application/json')
      .set('appclient', 'sysnode-info')
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeObject();
        expect(res.body.users).toBeNumber();
        done();
      });
  }, 30000);
});
